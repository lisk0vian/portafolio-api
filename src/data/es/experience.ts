import type { ExperienceDto } from '../../modules/experience/experience.dto.js';

// Static content for the experience section (es).
// Shape mirrors the "Trayectoria" mockup: timeline entries with measurable wins.
const experience = [
  {
    "company": "Empresa ejemplo · Remoto",
    "role": "Desarrollador Backend",
    "location": "Remoto",
    "startDate": "2023-01",
    "endDate": null,
    "current": true,
    "description": "Edita con tu experiencia real: una frase sobre el alcance del rol y el problema que resuelves.",
    "wins": [
      "Logro medible número uno (p. ej. -40% latencia).",
      "Logro medible número dos."
    ],
    "stack": [
      "NestJS",
      "PostgreSQL",
      "Docker"
    ],
    "editions": ["fullstack"]
  },
  {
    "company": "Empresa ejemplo · Ciudad",
    "role": "Rol anterior",
    "location": "Ciudad",
    "startDate": "2021-01",
    "endDate": "2022-12",
    "current": false,
    "description": "Descripción breve del rol anterior.",
    "wins": [
      "Logro principal."
    ],
    "stack": [
      "Node.js",
      "React"
    ],
    "editions": ["data"]
  }
] satisfies ExperienceDto[];

export default experience;
