// Factory for education entries. Common holds the neutral period;
// school/degree/description are localized.
import type { EducationDto } from '../../modules/education/education.dto.js';
import {
  LocalizedFactory,
  LocaleScope,
  type ContentLang,
} from './localized.factory.js';

export type EducationCommon = Pick<EducationDto, 'period' | 'editions'>;
export type EducationLocalized = Pick<
  EducationDto,
  'school' | 'degree' | 'description'
>;

export class EducationLocale extends LocaleScope<
  EducationCommon,
  EducationLocalized
> {
  school(value: string): this {
    return this.set('school', value);
  }

  degree(value: string): this {
    return this.set('degree', value);
  }

  description(value: string): this {
    return this.set('description', value);
  }
}

export class EducationFactory extends LocalizedFactory<
  EducationCommon,
  EducationLocalized,
  EducationDto,
  EducationLocale
> {
  period(value: string): this {
    return this.setCommon('period', value);
  }

  editions(value: EducationCommon['editions']): this {
    return this.setCommon('editions', value);
  }

  protected scope(
    lang: ContentLang,
    common: Readonly<EducationCommon>,
  ): EducationLocale {
    return new EducationLocale(common, lang);
  }

  protected requiredLocalized = ['school', 'degree', 'description'] as const;

  protected merge(
    common: EducationCommon,
    localized: EducationLocalized,
  ): EducationDto {
    return { ...common, ...localized };
  }
}
