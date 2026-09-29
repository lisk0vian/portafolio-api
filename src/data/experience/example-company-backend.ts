// Experience entry: current backend role.
import { ExperienceFactory } from '../_factories/experience.factory.js';

const base = new ExperienceFactory()
  .company('Example Company · Remote')
  .startDate('2023-01')
  .endDate(null)
  .current(true)
  .stack(['NestJS', 'PostgreSQL', 'Docker'])
  .editions(['fullstack']);

const en = base
  .locale('en')
  .role('Backend Developer')
  .location('Remote')
  .description(
    'Edit with your real experience: one line on the role scope and the problem you solve.',
  )
  .wins([
    'Measurable win number one (e.g. −40% latency).',
    'Measurable win number two.',
  ]);

const es = base
  .locale('es')
  .role('Desarrollador Backend')
  .location('Remoto')
  .description(
    'Edita con tu experiencia real: una frase sobre el alcance del rol y el problema que resuelves.',
  )
  .wins([
    'Logro medible número uno (p. ej. -40% latencia).',
    'Logro medible número dos.',
  ]);

export default base.assemble(en, es);
