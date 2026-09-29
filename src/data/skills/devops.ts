// Skill group: devops.
import { SkillGroupFactory } from '../_factories/skills.factory.js';

const base = new SkillGroupFactory().items([
  { name: 'Docker', years: 4, daily: true },
  { name: 'CI/CD', years: 3, daily: true },
  { name: 'GitHub Actions', years: 3, daily: false },
  { name: 'AWS', years: 2, daily: false },
  { name: 'Nginx', years: 2, daily: false },
  { name: 'Kubernetes', years: 1, daily: false },
  { name: 'Terraform', years: 1, daily: false },
]);

const en = base.locale('en').category('DevOps');
const es = base.locale('es').category('DevOps');

export default base.assemble(en, es);
