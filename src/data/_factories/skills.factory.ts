// Factory for skill groups. Items are language-neutral;
// only the category label is localized.
import type { SkillGroupDto } from '../../modules/skills/skills.dto.js';
import {
  LocalizedFactory,
  LocaleScope,
  type ContentLang,
} from './localized.factory.js';

export type SkillGroupCommon = Pick<SkillGroupDto, 'items' | 'editions'>;
export type SkillGroupLocalized = Pick<SkillGroupDto, 'category'>;

export class SkillGroupLocale extends LocaleScope<
  SkillGroupCommon,
  SkillGroupLocalized
> {
  category(value: string): this {
    return this.set('category', value);
  }
}

export class SkillGroupFactory extends LocalizedFactory<
  SkillGroupCommon,
  SkillGroupLocalized,
  SkillGroupDto,
  SkillGroupLocale
> {
  items(value: SkillGroupCommon['items']): this {
    return this.setCommon('items', value);
  }

  editions(value: SkillGroupCommon['editions']): this {
    return this.setCommon('editions', value);
  }

  protected scope(
    lang: ContentLang,
    common: Readonly<SkillGroupCommon>,
  ): SkillGroupLocale {
    return new SkillGroupLocale(common, lang);
  }

  protected requiredLocalized = ['category'] as const;

  protected merge(
    common: SkillGroupCommon,
    localized: SkillGroupLocalized,
  ): SkillGroupDto {
    return { ...common, ...localized };
  }
}
