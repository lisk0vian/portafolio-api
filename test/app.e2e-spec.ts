import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './../src/app.module.js';
import {
  API_VERSION_HEADER,
  DEFAULT_API_VERSION,
} from './../src/common/versioning/api-version.const.js';
import { apiVersionExtractor } from './../src/common/versioning/api-version.extractor.js';

describe('Portfolio API (e2e)', () => {
  let app: NestFastifyApplication;

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

  it('/api/health (GET)', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/health' });
    assert.equal(res.statusCode, 200);
    assert.match(res.json().status, /ok/);
  });

  it('/api/health with explicit version header (GET)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/health',
      headers: { [API_VERSION_HEADER]: '1' },
    });
    assert.equal(res.statusCode, 200);
  });

  it('/api/health with unsupported version falls back to default (GET)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/health',
      headers: { [API_VERSION_HEADER]: '99' },
    });
    assert.equal(res.statusCode, 200);
  });

  it('/api/profile defaults to English', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/profile' });
    assert.equal(res.statusCode, 200);
    assert.match(res.json().tagline, /build fast/);
  });

  it('/api/profile in Spanish via Accept-Language', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/profile',
      headers: { 'accept-language': 'es' },
    });
    assert.equal(res.statusCode, 200);
    assert.match(res.json().tagline, /Construyo/);
  });

  it('/api/profile in Spanish via x-lang override', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/profile',
      headers: { 'accept-language': 'en', 'x-lang': 'es' },
    });
    assert.equal(res.statusCode, 200);
    assert.match(res.json().tagline, /Construyo/);
  });

  it('/api/profile falls back to English for unsupported language', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/profile',
      headers: { 'accept-language': 'fr' },
    });
    assert.equal(res.statusCode, 200);
    assert.match(res.json().tagline, /build fast/);
  });

  it('/api/projects keeps stable URL across languages', async () => {
    const en = await app.inject({ method: 'GET', url: '/api/projects' });
    const es = await app.inject({
      method: 'GET',
      url: '/api/projects',
      headers: { 'accept-language': 'es' },
    });
    assert.equal(en.statusCode, 200);
    assert.equal(es.statusCode, 200);
    assert.ok(Array.isArray(en.json()));
    assert.equal(en.json()[0].slug, es.json()[0].slug);
    assert.notEqual(en.json()[0].title, es.json()[0].title);
  });

  it('/api/projects/:slug (GET 404)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/projects/does-not-exist',
    });
    assert.equal(res.statusCode, 404);
  });

  it('/api/experience (GET)', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/experience' });
    assert.equal(res.statusCode, 200);
  });

  it('/api/skills (GET)', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/skills' });
    assert.equal(res.statusCode, 200);
  });

  it('/api/education (GET)', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/education' });
    assert.equal(res.statusCode, 200);
  });

  it('/api/certifications (GET)', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/certifications' });
    assert.equal(res.statusCode, 200);
    assert.ok(Array.isArray(res.json()));
  });

  it('/api/certifications groups by tag (GET)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/certifications?tag=aws',
    });
    assert.equal(res.statusCode, 200);
    assert.ok(res.json().length >= 2);
    assert.ok(res.json().every((c) => c.tags.includes('aws')));
  });

  it('/api/certifications filters by single group (GET)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/certifications?group=aws',
    });
    assert.equal(res.statusCode, 200);
    assert.ok(res.json().length >= 2);
    assert.ok(res.json().every((c) => c.tags.includes('aws')));
  });

  it('/api/certifications rejects multi-value group (GET 400)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/certifications?group=aws,cloud',
    });
    assert.equal(res.statusCode, 400);
  });

  it('/api/certifications lists groups with counts (GET)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/certifications/groups',
    });
    assert.equal(res.statusCode, 200);
    const aws = res.json().find((g) => g.group === 'aws');
    assert.ok(aws);
    assert.equal(aws.count, 2);
  });

  it('/api/certifications returns a single group (GET)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/certifications/groups/aws',
    });
    assert.equal(res.statusCode, 200);
    assert.ok(res.json().length >= 2);
    assert.ok(res.json().every((c) => c.tags.includes('aws')));
  });

  it('/api/certifications returns [] for unknown group (GET)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/certifications/groups/does-not-exist',
    });
    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.json(), []);
  });

  it('/api/certifications rejects group in query on group detail (GET 400)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/certifications/groups/aws?group=aws',
    });
    assert.equal(res.statusCode, 400);
  });

  it('/api/certifications supports sparse responses (GET)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/certifications?fields=title',
    });
    assert.equal(res.statusCode, 200);
    assert.deepEqual(Object.keys(res.json()[0]).sort(), ['slug', 'title']);
  });

  it('/api/certifications rejects unknown fields (GET 400)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/certifications?fields=slug,nope',
    });
    assert.equal(res.statusCode, 400);
  });

  it('/api/certifications keeps stable URL across languages (GET)', async () => {
    const en = await app.inject({ method: 'GET', url: '/api/certifications' });
    const es = await app.inject({
      method: 'GET',
      url: '/api/certifications',
      headers: { 'accept-language': 'es' },
    });
    assert.equal(en.statusCode, 200);
    assert.equal(es.statusCode, 200);
    const one = (list) =>
      list.find((c) => c.slug === 'my-featured-certification');
    assert.notEqual(one(en.json()).title, one(es.json()).title);
  });

  it('/api/certifications/:slug (GET 404)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/certifications/does-not-exist',
    });
    assert.equal(res.statusCode, 404);
  });

  it('/api/case-studies (GET)', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/case-studies' });
    assert.equal(res.statusCode, 200);
    assert.ok(Array.isArray(res.json()));
  });

  it('/api/case-studies filters by project (GET)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/case-studies?projectSlug=payments-platform',
    });
    assert.equal(res.statusCode, 200);
    assert.equal(res.json().length, 1);
    assert.equal(res.json()[0].slug, 'payments-platform');
  });

  it('/api/case-studies keeps stable URL across languages (GET)', async () => {
    const en = await app.inject({ method: 'GET', url: '/api/case-studies' });
    const es = await app.inject({
      method: 'GET',
      url: '/api/case-studies',
      headers: { 'accept-language': 'es' },
    });
    assert.equal(en.statusCode, 200);
    assert.equal(es.statusCode, 200);
    const one = (list) => list.find((c) => c.slug === 'payments-platform');
    assert.equal(
      one(en.json()).sections.length,
      one(es.json()).sections.length,
    );
    assert.notEqual(one(en.json()).title, one(es.json()).title);
  });

  it('/api/case-studies/:slug (GET 404)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/case-studies/does-not-exist',
    });
    assert.equal(res.statusCode, 404);
  });
});
