import type { ProjectDto } from '../../modules/projects/projects.dto.js';

// Static content for the projects section (es).
const projects = [
  {
    "slug": "portfolio-api",
    "title": "API de Portafolio",
    "description": "API pública de solo lectura para mi portafolio, con NestJS + Fastify.",
    "stack": [
      "NestJS",
      "Fastify",
      "TypeScript"
    ],
    "featured": true,
    "year": 2026,
    "links": {
      "repo": "https://github.com/tu-usuario/portfolio-api"
    }
  },
  {
    "slug": "my-featured-project",
    "title": "Mi proyecto destacado",
    "description": "Edita este archivo con tus proyectos reales.",
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
