// Skill group: data.
import { SkillGroupFactory } from '../_factories/skills.factory.js';

const base = new SkillGroupFactory()
  .items([
    { name: 'Python', years: 4, daily: true },
    { name: 'SQL', years: 4, daily: true },
    { name: 'Pandas', years: 3, daily: true },
    { name: 'dbt', years: 2, daily: false },
    { name: 'scikit-learn', years: 2, daily: false },
    { name: 'XGBoost', years: 2, daily: false },
  ])
  .editions(['data']);

const en = base.locale('en').category('Data');
const es = base.locale('es').category('Datos');

export default base.assemble(en, es);
