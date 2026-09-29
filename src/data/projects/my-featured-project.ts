// Project: placeholder entry.
import { ProjectFactory } from '../_factories/projects.factory.js';

const base = new ProjectFactory()
  .slug('my-featured-project')
  .stack(['TypeScript', 'Node.js'])
  .year(2025)
  .links({})
  .featured(false);

const en = base
  .locale('en')
  .title('My featured project')
  .description('Edit this file with your real projects.');

const es = base
  .locale('es')
  .title('Mi proyecto destacado')
  .description('Edita este archivo con tus proyectos reales.');

export default base.assemble(en, es);
