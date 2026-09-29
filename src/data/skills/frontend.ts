// Skill group: frontend.
import { SkillGroupFactory } from '../_factories/skills.factory.js';

const base = new SkillGroupFactory()
  .items([
    { name: 'React', years: 4, daily: true },
    { name: 'Tailwind', years: 3, daily: true },
    { name: 'Next.js', years: 3, daily: false },
    { name: 'Vite', years: 2, daily: false },
    { name: 'Zustand', years: 1, daily: false },
  ])
  .editions(['fullstack']);

const en = base.locale('en').category('Frontend');
const es = base.locale('es').category('Frontend');

export default base.assemble(en, es);
