// Certification: placeholder entry (issuer/category stay neutral).
import { CertificationFactory } from '../_factories/certifications.factory.js';

const base = new CertificationFactory()
  .slug('my-featured-certification')
  .issuer('Example Issuer')
  .category('Development')
  .tags(['example'])
  .issueDate('2020-01')
  .expiryDate('2022-01')
  .skills(['TypeScript'])
  .featured(false);

const en = base.locale('en').title('My featured certification');
const es = base.locale('es').title('Mi certificación destacada');

export default base.assemble(en, es);
