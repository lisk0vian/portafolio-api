// Certification: AWS Solutions Architect Associate.
import { CertificationFactory } from '../_factories/certifications.factory.js';

const base = new CertificationFactory()
  .slug('aws-solutions-architect-associate')
  .issuer('Amazon Web Services')
  .category('Cloud')
  .tags(['aws', 'cloud', 'architecture'])
  .issueDate('2023-03')
  .expiryDate('2026-03')
  .credentialId('AWS-ARCH-002')
  .skills(['Docker', 'CI/CD'])
  .level('Associate')
  .featured(false);

const en = base
  .locale('en')
  .title('AWS Certified Solutions Architect – Associate');
const es = base
  .locale('es')
  .title('AWS Certified Solutions Architect – Associate');

export default base.assemble(en, es);
