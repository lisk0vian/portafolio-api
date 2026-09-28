import type { CaseStudyDto } from '../../modules/case-studies/case-studies.dto.js';

// Static content for the case-studies section (es).
const caseStudies = [
  {
    "slug": "payments-platform",
    "projectSlug": "payments-platform",
    "title": "Plataforma de pagos",
    "deck": "Cómo rediseñamos la conciliación de pagos para 4.000 comercios sin detener el servicio.",
    "meta": [
      {
        "label": "Rol",
        "value": "Líder técnico · Ingeniería"
      },
      {
        "label": "Año",
        "value": "2026"
      },
      {
        "label": "Duración",
        "value": "7 meses"
      },
      {
        "label": "Stack",
        "value": "Go · PostgreSQL · React · AWS"
      }
    ],
    "coverImage": {
      "src": "https://example.com/cases/payments-cover.png",
      "alt": "Captura del panel de conciliación",
      "caption": "Panel de conciliación en tiempo casi real."
    },
    "tags": [
      "fintech",
      "backend"
    ],
    "publishedAt": "2026-05",
    "sections": [
      {
        "id": "problem",
        "title": "Problema",
        "blocks": [
          {
            "type": "paragraph",
            "text": "La conciliación se hacía con scripts nocturnos y hojas de cálculo. Los errores tardaban días en detectarse y soporte recibía cientos de tickets por semana."
          }
        ]
      },
      {
        "id": "approach",
        "title": "Enfoque",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Separamos la ingesta de eventos del cálculo de saldos e introdujimos un libro contable de doble entrada."
          },
          {
            "type": "diagram",
            "format": "mermaid",
            "source": "graph TD; Events-->Ledger; Ledger-->Balances; Balances-->Dashboard;",
            "caption": "Flujo de eventos desde la ingesta hasta el panel."
          }
        ]
      },
      {
        "id": "architecture",
        "title": "Arquitectura",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Cada movimiento es un asiento inmutable. Los saldos se derivan, nunca se editan."
          },
          {
            "type": "code",
            "language": "go",
            "source": "// ledger/entry.go\ntype Entry struct {\n  ID       uuid.UUID\n  Account  string\n  Amount   decimal.Decimal\n  PostedAt time.Time\n}",
            "caption": "Listado 1 — Estructura de un asiento contable."
          },
          {
            "type": "image",
            "src": "https://example.com/cases/payments-architecture.png",
            "alt": "Diagrama de arquitectura del libro contable",
            "caption": "Fig. 2 — Libro contable y derivación de saldos."
          }
        ]
      },
      {
        "id": "results",
        "title": "Resultados",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Tras tres meses en producción, estos fueron los cambios medidos:"
          },
          {
            "type": "table",
            "caption": "Cambios medidos tras tres meses.",
            "headers": [
              "Métrica",
              "Antes",
              "Después"
            ],
            "rows": [
              [
                "Latencia p95 de la API",
                "840 ms",
                "120 ms"
              ],
              [
                "Tickets de soporte / semana",
                "310",
                "45"
              ]
            ]
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Tiempo de conciliación",
                "value": "5 min"
              },
              {
                "label": "Hallazgos de auditoría",
                "value": "0"
              }
            ]
          }
        ]
      },
      {
        "id": "lessons",
        "title": "Aprendizajes",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Un modelo de datos correcto simplifica más código que cualquier framework."
          }
        ]
      }
    ],
    "quote": "El panel fue lo visible; el libro contable fue lo que resolvió el problema.",
    "nextCaseSlug": "churn-prediction"
  },
  {
    "slug": "churn-prediction",
    "projectSlug": "churn-prediction",
    "title": "Predicción de abandono",
    "deck": "Un modelo de churn que el equipo comercial entiende, usa y en el que confía.",
    "meta": [
      {
        "label": "Rol",
        "value": "Científico de datos"
      },
      {
        "label": "Año",
        "value": "2026"
      },
      {
        "label": "Duración",
        "value": "4 meses"
      },
      {
        "label": "Stack",
        "value": "Python · XGBoost · SHAP · dbt"
      }
    ],
    "coverImage": {
      "src": "https://example.com/cases/churn-cover.png",
      "alt": "Curva ROC y gráfico SHAP",
      "caption": "Importancia de variables (SHAP) sobre el conjunto de validación."
    },
    "tags": [
      "data",
      "ml"
    ],
    "publishedAt": "2026-08",
    "sections": [
      {
        "id": "problem",
        "title": "Problema",
        "blocks": [
          {
            "type": "paragraph",
            "text": "El 9% de los clientes cancelaba cada trimestre y el equipo comercial solo se enteraba cuando ya era tarde para actuar."
          }
        ]
      },
      {
        "id": "model",
        "title": "Modelo",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Validación por ventanas de tiempo para evitar fuga de información y un umbral elegido según la capacidad real del equipo comercial."
          },
          {
            "type": "code",
            "language": "python",
            "source": "model = xgb.XGBClassifier(n_estimators=600, max_depth=5)\nmodel.fit(X_train, y_train)",
            "caption": "Listado 1 — Entrenamiento."
          }
        ]
      },
      {
        "id": "results",
        "title": "Resultados",
        "blocks": [
          {
            "type": "table",
            "caption": "Resultados fuera de muestra sobre el trimestre siguiente.",
            "headers": [
              "Métrica",
              "Antes",
              "Después"
            ],
            "rows": [
              [
                "AUC-ROC",
                "0.74",
                "0.91"
              ],
              [
                "Churn trimestral",
                "9.0%",
                "6.8%"
              ]
            ]
          }
        ]
      }
    ],
    "quote": "Un modelo que nadie entiende es un modelo que nadie usa."
  }
] satisfies CaseStudyDto[];

export default caseStudies;
