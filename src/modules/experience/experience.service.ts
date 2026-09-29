import { Injectable } from '@nestjs/common';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import { experienceEn, experienceEs } from '../../data/experience/index.js';
import type { ExperienceDto } from './experience.dto.js';

const EXPERIENCE_BY_LANGUAGE: Record<SupportedLanguage, ExperienceDto[]> = {
  en: experienceEn,
  es: experienceEs,
};

@Injectable()
export class ExperienceService {
  findAll(lang: SupportedLanguage): ExperienceDto[] {
    return EXPERIENCE_BY_LANGUAGE[lang];
  }
}
