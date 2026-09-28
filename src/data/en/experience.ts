import type { ExperienceDto } from '../../modules/experience/experience.dto.js';

// Static content for the experience section (en).
const experience = [
  {
    "company": "Example Company",
    "role": "Backend Developer",
    "location": "Remote",
    "startDate": "2023-01",
    "endDate": null,
    "current": true,
    "description": "Edit with your real experience.",
    "stack": [
      "NestJS",
      "PostgreSQL"
    ]
  }
] satisfies ExperienceDto[];

export default experience;
