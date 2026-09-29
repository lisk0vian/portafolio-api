// Factory for publications. Title/venue stay in their original language;
// abstract/pages/language are localized (pages/language differ in es today).
import type { PublicationDto } from '../../modules/publications/publications.dto.js';
import {
  LocalizedFactory,
  LocaleScope,
  type ContentLang,
} from './localized.factory.js';

export type PublicationCommon = Omit<
  PublicationDto,
  'abstract' | 'pages' | 'language'
>;
export type PublicationLocalized = Pick<
  PublicationDto,
  'abstract' | 'pages' | 'language'
>;

export class PublicationLocale extends LocaleScope<
  PublicationCommon,
  PublicationLocalized
> {
  abstract(value: string): this {
    return this.set('abstract', value);
  }

  pages(value: string): this {
    return this.set('pages', value);
  }

  language(value: string): this {
    return this.set('language', value);
  }
}

export class PublicationFactory extends LocalizedFactory<
  PublicationCommon,
  PublicationLocalized,
  PublicationDto,
  PublicationLocale
> {
  slug(value: string): this {
    return this.setCommon('slug', value);
  }

  title(value: string): this {
    return this.setCommon('title', value);
  }

  authors(value: string[]): this {
    return this.setCommon('authors', value);
  }

  venue(value: string): this {
    return this.setCommon('venue', value);
  }

  type(value: PublicationCommon['type']): this {
    return this.setCommon('type', value);
  }

  year(value: number): this {
    return this.setCommon('year', value);
  }

  publishedAt(value: string): this {
    return this.setCommon('publishedAt', value);
  }

  doi(value: string): this {
    return this.setCommon('doi', value);
  }

  pdfUrl(value: string): this {
    return this.setCommon('pdfUrl', value);
  }

  url(value: string): this {
    return this.setCommon('url', value);
  }

  keywords(value: string[]): this {
    return this.setCommon('keywords', value);
  }

  featured(value: boolean): this {
    return this.setCommon('featured', value);
  }

  protected scope(
    lang: ContentLang,
    common: Readonly<PublicationCommon>,
  ): PublicationLocale {
    return new PublicationLocale(common, lang);
  }

  protected requiredLocalized = ['abstract'] as const;

  protected merge(
    common: PublicationCommon,
    localized: PublicationLocalized,
  ): PublicationDto {
    return { ...common, ...localized };
  }
}
