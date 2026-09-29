// Education entry: systems engineering degree.
import { EducationFactory } from '../_factories/education.factory.js';

const base = new EducationFactory().period('2020 - 2024');

const en = base
  .locale('en')
  .school('Example University')
  .degree('Systems Engineering')
  .description('Edit with your real education: major, thesis or honors.');

const es = base
  .locale('es')
  .school('Universidad ejemplo')
  .degree('Ingeniería en Sistemas')
  .description('Edita con tu educación real: especialidad, tesis o mención.');

export default base.assemble(en, es);
