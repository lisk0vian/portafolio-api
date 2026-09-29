import type { ExperienceDto } from '../../modules/experience/experience.dto.js';

// Static content for the experience section (en).
// Shape mirrors the "Trayectoria" mockup: timeline entries with measurable wins.
const experience = [
  {
    "company": "Example Company · Remote",
    "role": "Backend Developer",
    "location": "Remote",
    "startDate": "2023-01",
    "endDate": null,
    "current": true,
    "description": "Edit with your real experience: one line on the role scope and the problem you solve.",
    "wins": [
      "Measurable win number one (e.g. −40% latency).",
      "Measurable win number two."
    ],
    "stack": [
      "NestJS",
      "PostgreSQL",
      "Docker"
    ],
    "editions": ["fullstack"]
  },
  {
    "company": "Example Company · City",
    "role": "Previous Role",
    "location": "City",
    "startDate": "2021-01",
    "endDate": "2022-12",
    "current": false,
    "description": "Short description of the previous role.",
    "wins": [
      "Main achievement."
    ],
    "stack": [
      "Node.js",
      "React"
    ],
    "editions": ["data"]
  }
] satisfies ExperienceDto[];

export default experience;
