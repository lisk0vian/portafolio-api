import { Injectable } from '@nestjs/common';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import { educationEn, educationEs } from '../../data/education/index.js';
import type { EducationDto } from './education.dto.js';

const EDUCATION_BY_LANGUAGE: Record<SupportedLanguage, EducationDto[]> = {
  en: educationEn,
  es: educationEs,
};

@Injectable()
export class EducationService {
  findAll(lang: SupportedLanguage): EducationDto[] {
    return EDUCATION_BY_LANGUAGE[lang];
  }
}
