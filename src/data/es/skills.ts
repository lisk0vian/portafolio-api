import type { SkillGroupDto } from '../../modules/skills/skills.dto.js';

// Static content for the skills section (es).
const skills = [
  {
    "category": "Backend",
    "items": [
      "NestJS",
      "Fastify",
      "Node.js",
      "TypeScript"
    ]
  },
  {
    "category": "Frontend",
    "items": [
      "React",
      "Tailwind"
    ]
  },
  {
    "category": "DevOps",
    "items": [
      "Docker",
      "CI/CD"
    ]
  }
] satisfies SkillGroupDto[];

export default skills;
