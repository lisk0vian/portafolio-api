// Education entry: short course.
import { EducationFactory } from '../_factories/education.factory.js';

const base = new EducationFactory().period('2023');

const en = base
  .locale('en')
  .school('Example Institution')
  .degree('Course or certification')
  .description('Short description.');

const es = base
  .locale('es')
  .school('Institución ejemplo')
  .degree('Curso o certificación')
  .description('Descripción breve.');

export default base.assemble(en, es);
