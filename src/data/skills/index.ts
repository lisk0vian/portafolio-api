// Skill groups in display order.
import type { SkillGroupDto } from '../../modules/skills/skills.dto.js';
import backend from './backend.js';
import frontend from './frontend.js';
import devops from './devops.js';
import testing from './testing.js';
import data from './data.js';

const groups = [backend, frontend, devops, testing, data];

export const skillsEn: SkillGroupDto[] = groups.map((g) => g.en);
export const skillsEs: SkillGroupDto[] = groups.map((g) => g.es);
