import type { SkillGroupDto } from '../../modules/skills/skills.dto.js';

// Static content for the skills section (en).
// years/daily are language-neutral; keep them identical in the es file.
// Shape mirrors the "Capacidades" mockup: [name, daily-use, years].
const skills = [
  {
    "category": "Backend",
    "items": [
      { "name": "TypeScript", "years": 5, "daily": true },
      { "name": "Node.js", "years": 5, "daily": true },
      { "name": "NestJS", "years": 3, "daily": true },
      { "name": "PostgreSQL", "years": 4, "daily": true },
      { "name": "Express", "years": 4, "daily": false },
      { "name": "MongoDB", "years": 3, "daily": false },
      { "name": "Fastify", "years": 2, "daily": false },
      { "name": "GraphQL", "years": 2, "daily": false },
      { "name": "Prisma", "years": 2, "daily": false },
      { "name": "Redis", "years": 2, "daily": false },
      { "name": "RabbitMQ", "years": 1, "daily": false },
      { "name": "Go", "years": 1, "daily": false }
    ],
    "editions": ["fullstack"]
  },
  {
    "category": "Frontend",
    "items": [
      { "name": "React", "years": 4, "daily": true },
      { "name": "Tailwind", "years": 3, "daily": true },
      { "name": "Next.js", "years": 3, "daily": false },
      { "name": "Vite", "years": 2, "daily": false },
      { "name": "Zustand", "years": 1, "daily": false }
    ],
    "editions": ["fullstack"]
  },
  {
    "category": "DevOps",
    "items": [
      { "name": "Docker", "years": 4, "daily": true },
      { "name": "CI/CD", "years": 3, "daily": true },
      { "name": "GitHub Actions", "years": 3, "daily": false },
      { "name": "AWS", "years": 2, "daily": false },
      { "name": "Nginx", "years": 2, "daily": false },
      { "name": "Kubernetes", "years": 1, "daily": false },
      { "name": "Terraform", "years": 1, "daily": false }
    ]
  },
  {
    "category": "Pruebas",
    "items": [
      { "name": "Jest", "years": 3, "daily": true },
      { "name": "Supertest", "years": 2, "daily": false },
      { "name": "Vitest", "years": 1, "daily": false },
      { "name": "Playwright", "years": 1, "daily": false }
    ]
  },
  {
    "category": "Data",
    "items": [
      { "name": "Python", "years": 4, "daily": true },
      { "name": "SQL", "years": 4, "daily": true },
      { "name": "Pandas", "years": 3, "daily": true },
      { "name": "dbt", "years": 2, "daily": false },
      { "name": "scikit-learn", "years": 2, "daily": false },
      { "name": "XGBoost", "years": 2, "daily": false }
    ],
    "editions": ["data"]
  }
] satisfies SkillGroupDto[];

export default skills;
