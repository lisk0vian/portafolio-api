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
    },
    "metric": "60 req/min con throttle",
    "role": "Líder técnico",
    "problem": "El contenido del portafolio vivía en archivos estáticos; cada sección necesitaba su propio fetch y manejo de idioma.",
    "approach": "Una sola API de solo lectura con idioma y versión por cabeceras más selección dispersa de campos.",
    "result": "Un cliente consume cada sección en ambos idiomas con URLs estables.",
    "results": [
      { "label": "Latencia p95", "before": "420 ms", "after": "95 ms" },
      { "label": "Límite", "before": "ilimitado", "after": "60 req/min" }
    ],
    "resultsCaption": "Medido tras tres meses en producción."
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
  },
  {
    "slug": "payments-platform",
    "title": "Plataforma de pagos",
    "description": "Conciliación de pagos para 4.000 comercios con ledger de doble entrada. Ver el caso de estudio.",
    "stack": [
      "Go",
      "PostgreSQL",
      "React",
      "AWS"
    ],
    "featured": false,
    "year": 2026,
    "links": {},
    "metric": "p95 840ms → 120ms",
    "role": "Líder técnico",
    "problem": "La conciliación se hacía con scripts nocturnos; los errores tardaban días en aparecer.",
    "approach": "Libro contable inmutable de doble entrada, con ingesta de eventos separada del cálculo de saldos.",
    "result": "Soporte pasó de 310 a 45 tickets semanales.",
    "results": [
      { "label": "Latencia p95", "before": "840 ms", "after": "120 ms" },
      { "label": "Tickets / semana", "before": "310", "after": "45" },
      { "label": "Conciliación", "before": "24 h", "after": "5 min" }
    ],
    "resultsCaption": "Medido tras tres meses en producción.",
    "editions": ["fullstack"]
  },
  {
    "slug": "churn-prediction",
    "title": "Predicción de churn",
    "description": "Modelo de churn con probabilidades calibradas en el que confía el equipo comercial. Ver el caso de estudio.",
    "stack": [
      "Python",
      "XGBoost",
      "SHAP",
      "dbt"
    ],
    "featured": false,
    "year": 2026,
    "links": {},
    "metric": "AUC 0.91",
    "role": "Científico de datos",
    "problem": "El 9% de los clientes cancelaba cada trimestre y ventas se enteraba demasiado tarde.",
    "approach": "Variables de comportamiento con dbt, gradient boosting con validación temporal y explicaciones SHAP por cliente.",
    "result": "El churn trimestral bajó del 9,0% al 6,8%.",
    "results": [
      { "label": "AUC-ROC", "before": "0,74", "after": "0,91" },
      { "label": "Precisión @10%", "before": "0,31", "after": "0,62" },
      { "label": "Churn trimestral", "before": "9,0%", "after": "6,8%" }
    ],
    "resultsCaption": "Evaluado fuera de muestra, trimestre siguiente.",
    "editions": ["data"]
  }
] satisfies ProjectDto[];

export default projects;
