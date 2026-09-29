import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { performance } from 'node:perf_hooks';
import { AppModule } from './../src/app.module.js';
import { DEFAULT_API_VERSION } from './../src/common/versioning/api-version.const.js';
import { apiVersionExtractor } from './../src/common/versioning/api-version.extractor.js';

// Verifies factory-backed content per controller in both locales and
// records per-endpoint latency so eager-vs-lazy stays evidence-based.
describe('Factory content per controller (e2e)', () => {
  let app: NestFastifyApplication;
  const timings: Array<{ endpoint: string; lang: string; ms: number }> = [];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    app.setGlobalPrefix('api');
    app.enableVersioning({
      type: VersioningType.CUSTOM,
      extractor: apiVersionExtractor,
      defaultVersion: DEFAULT_API_VERSION,
    });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(() => {
    // eslint-disable-next-line no-console
    console.log(
      `api latency:\n${timings.map((t) => `  ${t.endpoint} [${t.lang}] ${t.ms.toFixed(2)} ms`).join('\n')}`,
    );
  });

  async function timedGet(url: string, lang: 'en' | 'es') {
    const start = performance.now();
    const res = await app.inject({
      method: 'GET',
      url,
      headers: { 'x-lang': lang },
    });
    const ms = performance.now() - start;
    const endpoint = url.replace('/api/', '/');
    timings.push({ endpoint, lang, ms });
    assert.equal(res.statusCode, 200, `GET ${url} [${lang}]`);
    assert.ok(ms < 1000, `GET ${url} [${lang}] took ${ms.toFixed(2)} ms`);
    return res.json();
  }

  it('profile serves both locales', async () => {
    const en = await timedGet('/api/profile', 'en');
    const es = await timedGet('/api/profile', 'es');
    assert.equal(en.name, 'Your Name');
    assert.equal(es.name, 'Tu Nombre');
    assert.notEqual(en.tagline, es.tagline);
  });

  it('projects list keeps slugs, translates titles', async () => {
    const en = await timedGet('/api/projects', 'en');
    const es = await timedGet('/api/projects', 'es');
    assert.deepEqual(
      en.map((p) => p.slug),
      es.map((p) => p.slug),
    );
    assert.notEqual(en[0].title, es[0].title);
    const detailEn = await timedGet('/api/projects/portfolio-api', 'en');
    const detailEs = await timedGet('/api/projects/portfolio-api', 'es');
    assert.equal(detailEn.title, 'Portfolio API');
    assert.equal(detailEs.title, 'API de Portafolio');
  });

  it('skills translate only categories', async () => {
    const en = await timedGet('/api/skills', 'en');
    const es = await timedGet('/api/skills', 'es');
    assert.deepEqual(
      en.map((g) => g.category),
      ['Backend', 'Frontend', 'DevOps', 'Pruebas', 'Data'],
    );
    assert.deepEqual(
      es.map((g) => g.category),
      ['Backend', 'Frontend', 'DevOps', 'Pruebas', 'Datos'],
    );
    assert.deepEqual(
      en.map((g) => g.items),
      es.map((g) => g.items),
    );
  });

  it('education translates schools', async () => {
    const en = await timedGet('/api/education', 'en');
    const es = await timedGet('/api/education', 'es');
    assert.equal(en[0].school, 'Example University');
    assert.equal(es[0].school, 'Universidad ejemplo');
  });

  it('experience keeps company neutral, translates role', async () => {
    const en = await timedGet('/api/experience', 'en');
    const es = await timedGet('/api/experience', 'es');
    assert.equal(en[0].company, es[0].company);
    assert.notEqual(en[0].role, es[0].role);
  });

  it('certifications serve list, detail and groups', async () => {
    const en = await timedGet('/api/certifications', 'en');
    const es = await timedGet('/api/certifications', 'es');
    assert.deepEqual(
      en.map((c) => c.slug),
      es.map((c) => c.slug),
    );
    const detail = await timedGet(
      '/api/certifications/aws-developer-associate',
      'es',
    );
    assert.equal(detail.title, 'AWS Certified Developer – Associate');
    await timedGet('/api/certifications/groups', 'en');
  });

  it('publications translate abstract, keep title', async () => {
    const en = await timedGet(
      '/api/publications/example-journal-paper',
      'en',
    );
    const es = await timedGet(
      '/api/publications/example-journal-paper',
      'es',
    );
    assert.equal(en.title, es.title);
    assert.notEqual(en.abstract, es.abstract);
  });

  it('case-studies translate narrative, keep structure', async () => {
    const en = await timedGet('/api/case-studies/payments-platform', 'en');
    const es = await timedGet('/api/case-studies/payments-platform', 'es');
    assert.notEqual(en.title, es.title);
    assert.equal(en.sections.length, es.sections.length);
    assert.deepEqual(
      en.sections.map((s) => s.id),
      es.sections.map((s) => s.id),
    );
  });
});
