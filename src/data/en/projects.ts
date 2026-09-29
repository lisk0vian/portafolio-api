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
    },
    "metric": "60 req/min throttled",
    "role": "Tech lead",
    "problem": "Portfolio content lived in static files; every section needed its own fetch and language handling.",
    "approach": "Single read-only API with header-based language and version negotiation plus sparse field selection.",
    "result": "One client consumes every section in both languages with stable URLs.",
    "results": [
      { "label": "p95 latency", "before": "420 ms", "after": "95 ms" },
      { "label": "Throttle", "before": "unlimited", "after": "60 req/min" }
    ],
    "resultsCaption": "Measured after three months in production."
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
  },
  {
    "slug": "payments-platform",
    "title": "Payments platform",
    "description": "Payment reconciliation for 4,000 merchants with a double-entry ledger. See the case study for details.",
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
    "role": "Tech lead",
    "problem": "Reconciliation ran on nightly scripts; errors took days to surface.",
    "approach": "Immutable double-entry ledger with event ingestion split from balance computation.",
    "result": "Support went from 310 to 45 weekly tickets.",
    "results": [
      { "label": "p95 latency", "before": "840 ms", "after": "120 ms" },
      { "label": "Tickets / week", "before": "310", "after": "45" },
      { "label": "Reconciliation", "before": "24 h", "after": "5 min" }
    ],
    "resultsCaption": "Measured after three months in production.",
    "editions": ["fullstack"]
  },
  {
    "slug": "churn-prediction",
    "title": "Churn prediction",
    "description": "Churn model with calibrated probabilities the sales team trusts. See the case study for details.",
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
    "role": "Data scientist",
    "problem": "9% of customers churned each quarter and sales found out too late.",
    "approach": "Behavioral features in dbt, gradient boosting with temporal validation and per-customer SHAP explanations.",
    "result": "Quarterly churn dropped from 9.0% to 6.8%.",
    "results": [
      { "label": "AUC-ROC", "before": "0.74", "after": "0.91" },
      { "label": "Precision @10%", "before": "0.31", "after": "0.62" },
      { "label": "Quarterly churn", "before": "9.0%", "after": "6.8%" }
    ],
    "resultsCaption": "Evaluated out of sample, following quarter.",
    "editions": ["data"]
  }
] satisfies ProjectDto[];

export default projects;
