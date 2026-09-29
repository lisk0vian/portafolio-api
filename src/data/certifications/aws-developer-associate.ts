// Certification: AWS Developer Associate.
import { CertificationFactory } from '../_factories/certifications.factory.js';

const base = new CertificationFactory()
  .slug('aws-developer-associate')
  .issuer('Amazon Web Services')
  .category('Cloud')
  .tags(['aws', 'cloud'])
  .issueDate('2024-06')
  .expiryDate('2027-06')
  .credentialId('AWS-DEV-001')
  .credentialUrl('https://aws.amazon.com/verification')
  .skills(['Node.js', 'Docker'])
  .level('Associate')
  .featured(true);

const en = base.locale('en').title('AWS Certified Developer – Associate');
const es = base.locale('es').title('AWS Certified Developer – Associate');

export default base.assemble(en, es);
