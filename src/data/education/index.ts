// Education entries in display order.
import type { EducationDto } from '../../modules/education/education.dto.js';
import exampleUniversity from './example-university.js';
import exampleInstitution from './example-institution.js';

const entries = [exampleUniversity, exampleInstitution];

export const educationEn: EducationDto[] = entries.map((e) => e.en);
export const educationEs: EducationDto[] = entries.map((e) => e.es);
