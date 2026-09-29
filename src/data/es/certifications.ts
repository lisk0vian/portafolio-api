import type { CertificationDto } from '../../modules/certifications/certifications.dto.js';

// Static content for the certifications section (es).
const certifications = [
  {
    "slug": "aws-developer-associate",
    "title": "AWS Certified Developer – Associate",
    "issuer": "Amazon Web Services",
    "category": "Cloud",
    "tags": [
      "aws",
      "cloud"
    ],
    "issueDate": "2024-06",
    "expiryDate": "2027-06",
    "credentialId": "AWS-DEV-001",
    "credentialUrl": "https://aws.amazon.com/verification",
    "skills": [
      "Node.js",
      "Docker"
    ],
    "level": "Associate",
    "featured": true
  },
  {
    "slug": "aws-solutions-architect-associate",
    "title": "AWS Certified Solutions Architect – Associate",
    "issuer": "Amazon Web Services",
    "category": "Cloud",
    "tags": [
      "aws",
      "cloud",
      "architecture"
    ],
    "issueDate": "2023-03",
    "expiryDate": "2026-03",
    "credentialId": "AWS-ARCH-002",
    "skills": [
      "Docker",
      "CI/CD"
    ],
    "level": "Associate",
    "featured": false
  },
  {
    "slug": "my-featured-certification",
    "title": "Mi certificación destacada",
    "issuer": "Emisor ejemplo",
    "category": "Desarrollo",
    "tags": [
      "example"
    ],
    "issueDate": "2020-01",
    "expiryDate": "2022-01",
    "skills": [
      "TypeScript"
    ],
    "featured": false
  }
] satisfies CertificationDto[];

export default certifications;
