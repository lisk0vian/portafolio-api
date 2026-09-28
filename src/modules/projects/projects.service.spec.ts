import { NotFoundException } from '@nestjs/common';
import { ProjectsService } from './projects.service.js';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(() => {
    service = new ProjectsService();
  });

  it('returns all projects in English by default', () => {
    const result = service.findAll('en', {});
    assert.ok(Array.isArray(result));
    assert.ok(result.length > 0);
  });

  it('returns localized content per language', () => {
    const en = service.findAll('en', {});
    const es = service.findAll('es', {});
    assert.equal(en.length, es.length);
    assert.equal(en[0].slug, es[0].slug);
    assert.notEqual(en[0].title, es[0].title);
  });

  it('filters by featured', () => {
    const result = service.findAll('en', { featured: 'true' });
    assert.ok(result.every((p) => p.featured === true));
  });

  it('finds by slug', () => {
    const all = service.findAll('en', {});
    const one = service.findOne('en', all[0].slug);
    assert.equal(one.slug, all[0].slug);
  });

  it('throws 404 for unknown slug', () => {
    assert.throws(() => service.findOne('en', 'does-not-exist'), NotFoundException);
  });
});
