import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import casesEn from '../../data/en/case-studies.js';
import casesEs from '../../data/es/case-studies.js';
import {
  CaseStudiesQueryDto,
  CaseStudyDto,
} from './case-studies.dto.js';

const CASES_BY_LANGUAGE: Record<SupportedLanguage, CaseStudyDto[]> = {
  en: casesEn,
  es: casesEs,
};

const FIELD_ALLOWLIST = new Set([
  'slug',
  'projectSlug',
  'title',
  'deck',
  'meta',
  'coverImage',
  'tags',
  'publishedAt',
  'sections',
  'quote',
  'nextCaseSlug',
]);

// Projects the case study to the requested fields.
// slug is always included so clients can fetch the detail later.
function pickFields(
  caseStudy: CaseStudyDto,
  fields?: string,
): Partial<CaseStudyDto> {
  if (!fields) return caseStudy;
  const requested = fields
    .split(',')
    .map((f) => f.trim())
    .filter((f) => f !== '');
  const unknown = requested.filter((f) => !FIELD_ALLOWLIST.has(f));
  if (unknown.length > 0) {
    throw new BadRequestException(`Unknown field(s): ${unknown.join(', ')}`);
  }
  const names = ['slug', ...requested.filter((f) => f !== 'slug')];
  return Object.fromEntries(
    names.map((name) => [name, caseStudy[name as keyof CaseStudyDto]]),
  );
}

@Injectable()
export class CaseStudiesService {
  findAll(
    lang: SupportedLanguage,
    query: CaseStudiesQueryDto,
  ): Partial<CaseStudyDto>[] {
    let result = [...CASES_BY_LANGUAGE[lang]];
    if (query.search) {
      const search = query.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(search) ||
          c.deck.toLowerCase().includes(search),
      );
    }
    if (query.projectSlug) {
      result = result.filter((c) => c.projectSlug === query.projectSlug);
    }
    if (query.tag) {
      const tags = new Set(
        query.tag
          .split(',')
          .map((t) => t.trim().toLowerCase())
          .filter((t) => t !== ''),
      );
      result = result.filter((c) =>
        c.tags.some((t) => tags.has(t.toLowerCase())),
      );
    }
    return result
      .slice(0, query.limit ?? 20)
      .map((c) => pickFields(c, query.fields));
  }

  findOne(
    lang: SupportedLanguage,
    slug: string,
    fields?: string,
  ): Partial<CaseStudyDto> {
    const caseStudy = CASES_BY_LANGUAGE[lang].find((c) => c.slug === slug);
    if (!caseStudy) throw new NotFoundException(`Case study '${slug}' not found`);
    return pickFields(caseStudy, fields);
  }
}
