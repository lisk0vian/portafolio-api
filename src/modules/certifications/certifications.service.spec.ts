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

  it('filters by a single group matched against tags', () => {
    const aws = service.findAll('en', { group: 'aws' });
    assert.ok(aws.length >= 2);
    assert.ok(
      aws.every((c) =>
        (c.tags as string[]).some((t) => t.toLowerCase() === 'aws'),
      ),
    );
  });

  it('matches group case-insensitively', () => {
    const lower = service.findAll('en', { group: 'aws' });
    const upper = service.findAll('en', { group: 'AWS' });
    assert.deepEqual(
      upper.map((c) => c.slug),
      lower.map((c) => c.slug),
    );
  });

  it('rejects multi-value and empty groups', () => {
    assert.throws(
      () => service.findAll('en', { group: 'aws,cloud' }),
      BadRequestException,
    );
    assert.throws(
      () => service.findAll('en', { group: '   ' }),
      BadRequestException,
    );
  });

  it('intersects group and tag filters (AND)', () => {
    const both = service.findAll('en', { group: 'aws', tag: 'cloud' });
    assert.ok(both.length >= 2);
    const none = service.findAll('en', { group: 'aws', tag: 'example' });
    assert.equal(none.length, 0);
  });

  it('lists groups with counts sorted alphabetically', () => {
    const groups = service.findGroups('en');
    const aws = groups.find((g) => g.group === 'aws');
    assert.ok(aws);
    assert.equal(aws.count, 2);
    const names = groups.map((g) => g.group);
    assert.deepEqual([...names].sort(), names);
  });

  it('enriches groups with latest cert and year range', () => {
    const groups = service.findGroups('en');
    const aws = groups.find((g) => g.group === 'aws');
    assert.ok(aws);
    assert.equal(aws.latest.title, 'AWS Certified Developer – Associate');
    assert.equal(aws.latest.level, 'Associate');
    assert.equal(aws.latest.year, 2024);
    assert.equal(aws.fromYear, 2023);
    assert.equal(aws.toYear, 2024);
  });

  it('finds certifications by group path param', () => {
    const result = service.findByGroup('en', 'aws', {});
    assert.ok(result.length >= 2);
    const sparse = service.findByGroup('en', 'aws', { fields: 'title' });
    assert.deepEqual(Object.keys(sparse[0]).sort(), ['slug', 'title']);
  });

  it('findByGroup returns [] for unknown groups and 400 for CSV', () => {
    assert.deepEqual(service.findByGroup('en', 'does-not-exist', {}), []);
    assert.throws(
      () => service.findByGroup('en', 'aws,cloud', {}),
      BadRequestException,
    );
    assert.throws(
      () => service.findByGroup('en', 'aws', { group: 'aws' }),
      BadRequestException,
    );
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
    const result = service.findOne(
      'en',
      'aws-developer-associate',
      'title,issuer',
    );
    assert.deepEqual(Object.keys(result).sort(), ['issuer', 'slug', 'title']);
  });

  it('throws 404 for unknown slug', () => {
    assert.throws(
      () => service.findOne('en', 'does-not-exist'),
      NotFoundException,
    );
  });
});
