import { Injectable } from '@nestjs/common';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import { profileEn, profileEs } from '../../data/profile/index.js';
import type { ProfileDto } from './profile.dto.js';

const PROFILE_BY_LANGUAGE: Record<SupportedLanguage, ProfileDto> = {
  en: profileEn,
  es: profileEs,
};

@Injectable()
export class ProfileService {
  findOne(lang: SupportedLanguage): ProfileDto {
    return PROFILE_BY_LANGUAGE[lang];
  }
}
