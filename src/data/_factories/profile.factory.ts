// Factory for the profile. Only the timezone stays neutral; every other
// field (including email/cvUrl, which differ per locale today) is localized.
import type { ProfileDto } from '../../modules/profile/profile.dto.js';
import {
  LocalizedFactory,
  LocaleScope,
  type ContentLang,
} from './localized.factory.js';

export type ProfileCommon = Pick<ProfileDto, 'timezone'>;
export type ProfileLocalized = Omit<ProfileDto, 'timezone'>;

export class ProfileLocale extends LocaleScope<
  ProfileCommon,
  ProfileLocalized
> {
  name(value: string): this {
    return this.set('name', value);
  }

  role(value: string): this {
    return this.set('role', value);
  }

  tagline(value: string): this {
    return this.set('tagline', value);
  }

  bio(value: string): this {
    return this.set('bio', value);
  }

  location(value: string): this {
    return this.set('location', value);
  }

  availability(value: string): this {
    return this.set('availability', value);
  }

  email(value: string): this {
    return this.set('email', value);
  }

  socials(value: ProfileLocalized['socials']): this {
    return this.set('socials', value);
  }

  about(value: string[]): this {
    return this.set('about', value);
  }

  notes(value: ProfileLocalized['notes']): this {
    return this.set('notes', value);
  }

  letter(value: string): this {
    return this.set('letter', value);
  }

  cvUrl(value: string): this {
    return this.set('cvUrl', value);
  }

  quote(value: string): this {
    return this.set('quote', value);
  }

  quoteSource(value: string): this {
    return this.set('quoteSource', value);
  }

  facts(value: ProfileLocalized['facts']): this {
    return this.set('facts', value);
  }

  principles(value: ProfileLocalized['principles']): this {
    return this.set('principles', value);
  }

  hoursNote(value: string): this {
    return this.set('hoursNote', value);
  }

  now(value: ProfileLocalized['now']): this {
    return this.set('now', value);
  }

  editions(value: ProfileLocalized['editions']): this {
    return this.set('editions', value);
  }
}

export class ProfileFactory extends LocalizedFactory<
  ProfileCommon,
  ProfileLocalized,
  ProfileDto,
  ProfileLocale
> {
  timezone(value: string): this {
    return this.setCommon('timezone', value);
  }

  protected scope(
    lang: ContentLang,
    common: Readonly<ProfileCommon>,
  ): ProfileLocale {
    return new ProfileLocale(common, lang);
  }

  protected requiredLocalized = [
    'name',
    'role',
    'tagline',
    'bio',
    'location',
    'availability',
    'email',
    'socials',
  ] as const;

  protected merge(
    common: ProfileCommon,
    localized: ProfileLocalized,
  ): ProfileDto {
    return { ...common, ...localized };
  }
}
