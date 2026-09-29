// Experience entries in display order.
import type { ExperienceDto } from '../../modules/experience/experience.dto.js';
import exampleCompanyBackend from './example-company-backend.js';
import exampleCompanyPrevious from './example-company-previous.js';

const entries = [exampleCompanyBackend, exampleCompanyPrevious];

export const experienceEn: ExperienceDto[] = entries.map((e) => e.en);
export const experienceEs: ExperienceDto[] = entries.map((e) => e.es);
