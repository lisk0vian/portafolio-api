import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CASE_STUDY_BLOCK_TYPES } from './case-studies.dto.js';
import { CaseStudiesService } from './case-studies.service.js';

describe('CaseStudiesService', () => {
  let service: CaseStudiesService;

  beforeEach(() => {
    service = new CaseStudiesService();
  });

  it('returns all case studies', () => {
    const result = service.findAll('en', {});
    assert.ok(Array.isArray(result));
    assert.ok(result.length > 0);
  });

  it('filters by project slug', () => {
    const result = service.findAll('en', { projectSlug: 'payments-platform' });
    assert.equal(result.length, 1);
    assert.equal(result[0].slug, 'payments-platform');
  });

  it('groups by tag', () => {
    const result = service.findAll('en', { tag: 'fintech' });
    assert.ok(result.length > 0);
    assert.ok(result.every((c) => (c.tags as string[]).includes('fintech')));
  });

  it('supports sparse responses and always includes slug', () => {
    const result = service.findAll('en', { fields: 'title' });
    assert.deepEqual(Object.keys(result[0]).sort(), ['slug', 'title']);
  });

  it('rejects unknown fields', () => {
    assert.throws(
      () => service.findAll('en', { fields: 'slug,nope' }),
      BadRequestException,
    );
  });

  it('returns localized content per language', () => {
    const en = service.findOne('en', 'payments-platform');
    const es = service.findOne('es', 'payments-platform');
    assert.equal(en.slug, es.slug);
    assert.notEqual(en.title, es.title);
  });

  it('throws 404 for unknown slug', () => {
    assert.throws(
      () => service.findOne('en', 'does-not-exist'),
      NotFoundException,
    );
  });

  describe('fixture shape (both languages)', () => {
    for (const lang of ['en', 'es'] as const) {
      it(`has valid blocks in ${lang} fixtures`, () => {
        const cases = service.findAll(lang, { limit: 50 });
        assert.ok(cases.length > 0);
        for (const c of cases) {
          assert.ok(c.slug);
          assert.ok((c.sections as unknown[]).length > 0);
          for (const section of c.sections as Array<{
            id: string;
            title: string;
            blocks: Array<Record<string, unknown>>;
          }>) {
            assert.ok(section.id);
            assert.ok(section.title);
            for (const block of section.blocks) {
              assert.ok(
                (CASE_STUDY_BLOCK_TYPES as readonly string[]).includes(
                  block.type as string,
                ),
                `unknown block type: ${String(block.type)}`,
              );
              if (block.type === 'table') {
                const headers = block.headers as unknown[];
                for (const row of block.rows as unknown[][]) {
                  assert.equal(row.length, headers.length);
                }
              }
              if (block.type === 'diagram') {
                if (block.format === 'mermaid') assert.ok(block.source);
                if (block.format === 'image') assert.ok(block.src);
              }
              if (block.type === 'image') assert.ok(block.src);
              if (block.type === 'code') {
                assert.ok(block.language);
                assert.ok(block.source);
              }
            }
          }
        }
      });
    }
  });
});
