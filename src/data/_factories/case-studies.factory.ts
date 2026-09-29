// Factory for case studies. Slugs/tags/dates stay neutral;
// narrative fields (title/deck/meta/sections) are localized as whole units.
import type { CaseStudyDto } from '../../modules/case-studies/case-studies.dto.js';
import {
  LocalizedFactory,
  LocaleScope,
  type ContentLang,
} from './localized.factory.js';

export type CaseStudyCommon = Pick<
  CaseStudyDto,
  'slug' | 'projectSlug' | 'tags' | 'publishedAt' | 'nextCaseSlug'
>;
export type CaseStudyLocalized = Pick<
  CaseStudyDto,
  'title' | 'deck' | 'meta' | 'coverImage' | 'sections' | 'quote'
>;

export class CaseStudyLocale extends LocaleScope<
  CaseStudyCommon,
  CaseStudyLocalized
> {
  title(value: string): this {
    return this.set('title', value);
  }

  deck(value: string): this {
    return this.set('deck', value);
  }

  meta(value: CaseStudyLocalized['meta']): this {
    return this.set('meta', value);
  }

  coverImage(value: CaseStudyLocalized['coverImage']): this {
    return this.set('coverImage', value);
  }

  sections(value: CaseStudyLocalized['sections']): this {
    return this.set('sections', value);
  }

  quote(value: string): this {
    return this.set('quote', value);
  }
}

export class CaseStudyFactory extends LocalizedFactory<
  CaseStudyCommon,
  CaseStudyLocalized,
  CaseStudyDto,
  CaseStudyLocale
> {
  slug(value: string): this {
    return this.setCommon('slug', value);
  }

  projectSlug(value: string): this {
    return this.setCommon('projectSlug', value);
  }

  tags(value: string[]): this {
    return this.setCommon('tags', value);
  }

  publishedAt(value: string): this {
    return this.setCommon('publishedAt', value);
  }

  nextCaseSlug(value: string): this {
    return this.setCommon('nextCaseSlug', value);
  }

  protected scope(
    lang: ContentLang,
    common: Readonly<CaseStudyCommon>,
  ): CaseStudyLocale {
    return new CaseStudyLocale(common, lang);
  }

  protected requiredLocalized = [
    'title',
    'deck',
    'meta',
    'coverImage',
    'sections',
  ] as const;

  protected merge(
    common: CaseStudyCommon,
    localized: CaseStudyLocalized,
  ): CaseStudyDto {
    return { ...common, ...localized };
  }
}
