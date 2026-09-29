// Factory for certifications. Only the title is localized;
// issuer/category/dates/credentials stay neutral (category removal is deferred).
import type { CertificationDto } from '../../modules/certifications/certifications.dto.js';
import {
  LocalizedFactory,
  LocaleScope,
  type ContentLang,
} from './localized.factory.js';

export type CertificationCommon = Omit<CertificationDto, 'title'>;
export type CertificationLocalized = Pick<CertificationDto, 'title'>;

export class CertificationLocale extends LocaleScope<
  CertificationCommon,
  CertificationLocalized
> {
  title(value: string): this {
    return this.set('title', value);
  }
}

export class CertificationFactory extends LocalizedFactory<
  CertificationCommon,
  CertificationLocalized,
  CertificationDto,
  CertificationLocale
> {
  slug(value: string): this {
    return this.setCommon('slug', value);
  }

  issuer(value: string): this {
    return this.setCommon('issuer', value);
  }

  category(value: string): this {
    return this.setCommon('category', value);
  }

  tags(value: string[]): this {
    return this.setCommon('tags', value);
  }

  issueDate(value: string): this {
    return this.setCommon('issueDate', value);
  }

  expiryDate(value: CertificationCommon['expiryDate']): this {
    return this.setCommon('expiryDate', value);
  }

  credentialId(value: string): this {
    return this.setCommon('credentialId', value);
  }

  credentialUrl(value: string): this {
    return this.setCommon('credentialUrl', value);
  }

  skills(value: string[]): this {
    return this.setCommon('skills', value);
  }

  level(value: string): this {
    return this.setCommon('level', value);
  }

  featured(value: boolean): this {
    return this.setCommon('featured', value);
  }

  protected scope(
    lang: ContentLang,
    common: Readonly<CertificationCommon>,
  ): CertificationLocale {
    return new CertificationLocale(common, lang);
  }

  protected requiredLocalized = ['title'] as const;

  protected merge(
    common: CertificationCommon,
    localized: CertificationLocalized,
  ): CertificationDto {
    return { ...common, ...localized };
  }
}
