import type { ProjectDto } from '../../modules/projects/projects.dto.js';

// Static content for the projects section (en).
const projects = [
  {
    "slug": "portfolio-api",
    "title": "Portfolio API",
    "description": "Public read-only API for my portfolio, built with NestJS + Fastify.",
    "stack": [
      "NestJS",
      "Fastify",
      "TypeScript"
    ],
    "featured": true,
    "year": 2026,
    "links": {
      "repo": "https://github.com/your-user/portfolio-api"
    }
  },
  {
    "slug": "my-featured-project",
    "title": "My featured project",
    "description": "Edit this file with your real projects.",
    "stack": [
      "TypeScript",
      "Node.js"
    ],
    "featured": false,
    "year": 2025,
    "links": {}
  }
] satisfies ProjectDto[];

export default projects;
