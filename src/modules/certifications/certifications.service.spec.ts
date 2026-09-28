import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CertificationsService } from './certifications.service.js';

describe('CertificationsService', () => {
  let service: CertificationsService;

  beforeEach(() => {
    service = new CertificationsService();
  });

  it('returns all certifications', () => {
    const result = service.findAll('en', {});
    assert.ok(Array.isArray(result));
    assert.ok(result.length > 0);
  });

  it('groups by tag with OR logic', () => {
    const aws = service.findAll('en', { tag: 'aws' });
    assert.ok(aws.length >= 2);
    assert.ok(aws.every((c) => (c.tags as string[]).includes('aws')));

    const multi = service.findAll('en', { tag: 'aws,example' });
    assert.equal(multi.length, service.findAll('en', {}).length);
  });

  it('filters by skill inside the skills array', () => {
    const result = service.findAll('en', { skill: 'docker' });
    assert.ok(result.length > 0);
    assert.ok(
      result.every((c) =>
        (c.skills as string[]).some((s) => s.toLowerCase().includes('docker')),
      ),
    );
  });

  it('filters by expiry status', () => {
    const expired = service.findAll('en', { expired: 'true' });
    const active = service.findAll('en', { expired: 'false' });
    assert.ok(expired.length > 0);
    assert.ok(active.length > 0);
    assert.ok(
      expired.every((c) => c.slug !== undefined) &&
        active.every((c) => c.slug !== undefined),
    );
    const expiredSlugs = new Set(expired.map((c) => c.slug));
    assert.ok(active.every((c) => !expiredSlugs.has(c.slug)));
  });

  it('projects sparse responses and always includes slug', () => {
    const result = service.findAll('en', { fields: 'title' });
    assert.ok(result.length > 0);
    assert.deepEqual(Object.keys(result[0]).sort(), ['slug', 'title']);
  });

  it('rejects unknown fields', () => {
    assert.throws(
      () => service.findAll('en', { fields: 'slug,nope' }),
      BadRequestException,
    );
  });

  it('returns localized content per language', () => {
    const en = service.findOne('en', 'my-featured-certification');
    const es = service.findOne('es', 'my-featured-certification');
    assert.equal(en.slug, es.slug);
    assert.notEqual(en.title, es.title);
  });

  it('supports sparse detail responses', () => {
    const result = service.findOne('en', 'aws-developer-associate', 'title,issuer');
    assert.deepEqual(Object.keys(result).sort(), ['issuer', 'slug', 'title']);
  });

  it('throws 404 for unknown slug', () => {
    assert.throws(
      () => service.findOne('en', 'does-not-exist'),
      NotFoundException,
    );
  });
});
