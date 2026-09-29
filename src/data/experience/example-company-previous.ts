// Experience entry: previous role.
import { ExperienceFactory } from '../_factories/experience.factory.js';

const base = new ExperienceFactory()
  .company('Example Company · City')
  .startDate('2021-01')
  .endDate('2022-12')
  .current(false)
  .stack(['Node.js', 'React'])
  .editions(['data']);

const en = base
  .locale('en')
  .role('Previous Role')
  .location('City')
  .description('Short description of the previous role.')
  .wins(['Main achievement.']);

const es = base
  .locale('es')
  .role('Rol anterior')
  .location('Ciudad')
  .description('Descripción breve del rol anterior.')
  .wins(['Logro principal.']);

export default base.assemble(en, es);
