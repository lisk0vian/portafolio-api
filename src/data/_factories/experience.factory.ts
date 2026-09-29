// Factory for experience entries. Company stays neutral by design;
// location is localized so it can be translated later.
import type { ExperienceDto } from '../../modules/experience/experience.dto.js';
import {
  LocalizedFactory,
  LocaleScope,
  type ContentLang,
} from './localized.factory.js';

export type ExperienceCommon = Pick<
  ExperienceDto,
  'company' | 'startDate' | 'endDate' | 'current' | 'stack' | 'editions'
>;
export type ExperienceLocalized = Pick<
  ExperienceDto,
  'role' | 'location' | 'description' | 'wins'
>;

export class ExperienceLocale extends LocaleScope<
  ExperienceCommon,
  ExperienceLocalized
> {
  role(value: string): this {
    return this.set('role', value);
  }

  location(value: string): this {
    return this.set('location', value);
  }

  description(value: string): this {
    return this.set('description', value);
  }

  wins(value: string[]): this {
    return this.set('wins', value);
  }
}

export class ExperienceFactory extends LocalizedFactory<
  ExperienceCommon,
  ExperienceLocalized,
  ExperienceDto,
  ExperienceLocale
> {
  company(value: string): this {
    return this.setCommon('company', value);
  }

  startDate(value: string): this {
    return this.setCommon('startDate', value);
  }

  endDate(value: ExperienceCommon['endDate']): this {
    return this.setCommon('endDate', value);
  }

  current(value: boolean): this {
    return this.setCommon('current', value);
  }

  stack(value: string[]): this {
    return this.setCommon('stack', value);
  }

  editions(value: ExperienceCommon['editions']): this {
    return this.setCommon('editions', value);
  }

  protected scope(
    lang: ContentLang,
    common: Readonly<ExperienceCommon>,
  ): ExperienceLocale {
    return new ExperienceLocale(common, lang);
  }

  protected requiredLocalized = ['role', 'location', 'description'] as const;

  protected merge(
    common: ExperienceCommon,
    localized: ExperienceLocalized,
  ): ExperienceDto {
    return { ...common, ...localized };
  }
}
