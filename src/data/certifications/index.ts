// Certifications in display order.
import type { CertificationDto } from '../../modules/certifications/certifications.dto.js';
import awsDeveloperAssociate from './aws-developer-associate.js';
import awsSolutionsArchitectAssociate from './aws-solutions-architect-associate.js';
import myFeaturedCertification from './my-featured-certification.js';

const entries = [
  awsDeveloperAssociate,
  awsSolutionsArchitectAssociate,
  myFeaturedCertification,
];

export const certificationsEn: CertificationDto[] = entries.map((e) => e.en);
export const certificationsEs: CertificationDto[] = entries.map((e) => e.es);
