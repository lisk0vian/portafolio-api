import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PublicationsService } from './publications.service.js';

describe('PublicationsService', () => {
  let service: PublicationsService;

  beforeEach(() => {
    service = new PublicationsService();
  });

  it('returns all publications', () => {
    const result = service.findAll('en', {});
    assert.ok(Array.isArray(result));
    assert.ok(result.length > 0);
  });

  it('filters by type journal|conference', () => {
    const journals = service.findAll('en', { type: 'journal' });
    assert.ok(journals.length > 0);
    assert.ok(journals.every((p) => p.type === 'journal'));

    const conferences = service.findAll('en', { type: 'conference' });
    assert.ok(conferences.length > 0);
    assert.ok(conferences.every((p) => p.type === 'conference'));
  });

  it('matches type case-insensitively', () => {
    const lower = service.findAll('en', { type: 'journal' });
    const upper = service.findAll('en', { type: 'JOURNAL' });
    assert.deepEqual(
      upper.map((p) => p.slug),
      lower.map((p) => p.slug),
    );
  });

  it('filters by year', () => {
    const result = service.findAll('en', { year: 2024 });
    assert.ok(result.length > 0);
    assert.ok(result.every((p) => p.year === 2024));
  });

  it('searches title, venue and abstract', () => {
    const byVenue = service.findAll('en', { search: 'journal of examples' });
    assert.ok(byVenue.length > 0);
    const none = service.findAll('en', { search: 'zzz-no-match' });
    assert.equal(none.length, 0);
  });

  it('filters keywords with OR logic', () => {
    const multi = service.findAll('en', { tag: 'research,conference' });
    assert.equal(multi.length, service.findAll('en', {}).length);
  });

  it('filters by featured', () => {
    const featured = service.findAll('en', { featured: 'true' });
    assert.ok(featured.length > 0);
    assert.ok(featured.every((p) => p.featured === true));
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

  it('returns localized abstracts with stable slugs', () => {
    const en = service.findOne('en', 'example-journal-paper');
    const es = service.findOne('es', 'example-journal-paper');
    assert.equal(en.slug, es.slug);
    assert.notEqual(en.abstract, es.abstract);
  });

  it('supports sparse detail responses', () => {
    const result = service.findOne('en', 'example-journal-paper', 'title,doi');
    assert.deepEqual(Object.keys(result).sort(), ['doi', 'slug', 'title']);
  });

  it('throws 404 for unknown slug', () => {
    assert.throws(
      () => service.findOne('en', 'does-not-exist'),
      NotFoundException,
    );
  });
});
