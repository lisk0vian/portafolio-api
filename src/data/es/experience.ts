import type { ExperienceDto } from '../../modules/experience/experience.dto.js';

// Static content for the experience section (es).
const experience = [
  {
    "company": "Empresa ejemplo",
    "role": "Desarrollador Backend",
    "location": "Remoto",
    "startDate": "2023-01",
    "endDate": null,
    "current": true,
    "description": "Edita con tu experiencia real.",
    "stack": [
      "NestJS",
      "PostgreSQL"
    ]
  }
] satisfies ExperienceDto[];

export default experience;
