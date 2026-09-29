// Skill group: backend.
import { SkillGroupFactory } from '../_factories/skills.factory.js';

const base = new SkillGroupFactory()
  .items([
    { name: 'TypeScript', years: 5, daily: true },
    { name: 'Node.js', years: 5, daily: true },
    { name: 'NestJS', years: 3, daily: true },
    { name: 'PostgreSQL', years: 4, daily: true },
    { name: 'Express', years: 4, daily: false },
    { name: 'MongoDB', years: 3, daily: false },
    { name: 'Fastify', years: 2, daily: false },
    { name: 'GraphQL', years: 2, daily: false },
    { name: 'Prisma', years: 2, daily: false },
    { name: 'Redis', years: 2, daily: false },
    { name: 'RabbitMQ', years: 1, daily: false },
    { name: 'Go', years: 1, daily: false },
  ])
  .editions(['fullstack']);

const en = base.locale('en').category('Backend');
const es = base.locale('es').category('Backend');

export default base.assemble(en, es);
