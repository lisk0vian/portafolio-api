// Skill group: testing.
import { SkillGroupFactory } from '../_factories/skills.factory.js';

const base = new SkillGroupFactory().items([
  { name: 'Jest', years: 3, daily: true },
  { name: 'Supertest', years: 2, daily: false },
  { name: 'Vitest', years: 1, daily: false },
  { name: 'Playwright', years: 1, daily: false },
]);

const en = base.locale('en').category('Pruebas');
const es = base.locale('es').category('Pruebas');

export default base.assemble(en, es);
