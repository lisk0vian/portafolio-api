import { Injectable } from '@nestjs/common';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import skillsEn from '../../data/en/skills.js';
import skillsEs from '../../data/es/skills.js';
import type { SkillGroupDto } from './skills.dto.js';

const SKILLS_BY_LANGUAGE: Record<SupportedLanguage, SkillGroupDto[]> = {
  en: skillsEn,
  es: skillsEs,
};

@Injectable()
export class SkillsService {
  findAll(lang: SupportedLanguage): SkillGroupDto[] {
    return SKILLS_BY_LANGUAGE[lang];
  }
}
