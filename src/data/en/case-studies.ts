import type { CaseStudyDto } from '../../modules/case-studies/case-studies.dto.js';

// Static content for the case-studies section (en).
const caseStudies = [
  {
    "slug": "payments-platform",
    "projectSlug": "payments-platform",
    "title": "Payments platform",
    "deck": "How we redesigned payment reconciliation for 4,000 merchants without stopping the service.",
    "meta": [
      {
        "label": "Role",
        "value": "Tech lead · Engineering"
      },
      {
        "label": "Year",
        "value": "2026"
      },
      {
        "label": "Duration",
        "value": "7 months"
      },
      {
        "label": "Stack",
        "value": "Go · PostgreSQL · React · AWS"
      }
    ],
    "coverImage": {
      "src": "https://example.com/cases/payments-cover.png",
      "alt": "Reconciliation dashboard screenshot",
      "caption": "Near real-time reconciliation dashboard."
    },
    "tags": [
      "fintech",
      "backend"
    ],
    "publishedAt": "2026-05",
    "sections": [
      {
        "id": "problem",
        "title": "Problem",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Reconciliation ran on nightly scripts and spreadsheets. Errors took days to surface and support received hundreds of tickets a week."
          }
        ]
      },
      {
        "id": "approach",
        "title": "Approach",
        "blocks": [
          {
            "type": "paragraph",
            "text": "We split event ingestion from balance computation and introduced a double-entry ledger."
          },
          {
            "type": "diagram",
            "format": "mermaid",
            "source": "graph TD; Events-->Ledger; Ledger-->Balances; Balances-->Dashboard;",
            "caption": "Event flow from ingestion to dashboard."
          }
        ]
      },
      {
        "id": "architecture",
        "title": "Architecture",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Every movement is an immutable entry. Balances are derived, never edited."
          },
          {
            "type": "code",
            "language": "go",
            "source": "// ledger/entry.go\ntype Entry struct {\n  ID       uuid.UUID\n  Account  string\n  Amount   decimal.Decimal\n  PostedAt time.Time\n}",
            "caption": "Listing 1 — Ledger entry structure."
          },
          {
            "type": "image",
            "src": "https://example.com/cases/payments-architecture.png",
            "alt": "Ledger architecture diagram",
            "caption": "Fig. 2 — Ledger and balance derivation."
          }
        ]
      },
      {
        "id": "results",
        "title": "Results",
        "blocks": [
          {
            "type": "paragraph",
            "text": "After three months in production, these were the measured changes:"
          },
          {
            "type": "table",
            "caption": "Measured changes after three months.",
            "headers": [
              "Metric",
              "Before",
              "After"
            ],
            "rows": [
              [
                "API p95 latency",
                "840 ms",
                "120 ms"
              ],
              [
                "Support tickets / week",
                "310",
                "45"
              ]
            ]
          },
          {
            "type": "metrics",
            "items": [
              {
                "label": "Reconciliation time",
                "value": "5 min"
              },
              {
                "label": "Audit findings",
                "value": "0"
              }
            ]
          }
        ]
      },
      {
        "id": "lessons",
        "title": "Lessons",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A correct data model simplifies more code than any framework."
          }
        ]
      }
    ],
    "quote": "The dashboard was what people saw; the ledger is what solved the problem.",
    "nextCaseSlug": "churn-prediction"
  },
  {
    "slug": "churn-prediction",
    "projectSlug": "churn-prediction",
    "title": "Churn prediction",
    "deck": "A churn model the sales team understands, uses and trusts.",
    "meta": [
      {
        "label": "Role",
        "value": "Data scientist"
      },
      {
        "label": "Year",
        "value": "2026"
      },
      {
        "label": "Duration",
        "value": "4 months"
      },
      {
        "label": "Stack",
        "value": "Python · XGBoost · SHAP · dbt"
      }
    ],
    "coverImage": {
      "src": "https://example.com/cases/churn-cover.png",
      "alt": "ROC curve and SHAP plot",
      "caption": "Feature importance (SHAP) on the validation set."
    },
    "tags": [
      "data",
      "ml"
    ],
    "publishedAt": "2026-08",
    "sections": [
      {
        "id": "problem",
        "title": "Problem",
        "blocks": [
          {
            "type": "paragraph",
            "text": "9% of customers churned every quarter and the sales team only found out when it was too late to act."
          }
        ]
      },
      {
        "id": "model",
        "title": "Model",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Time-window validation to avoid leakage, probability calibration and a threshold chosen from the real capacity of the sales team."
          },
          {
            "type": "code",
            "language": "python",
            "source": "model = xgb.XGBClassifier(n_estimators=600, max_depth=5)\nmodel.fit(X_train, y_train)",
            "caption": "Listing 1 — Training."
          }
        ]
      },
      {
        "id": "results",
        "title": "Results",
        "blocks": [
          {
            "type": "table",
            "caption": "Out-of-sample results on the following quarter.",
            "headers": [
              "Metric",
              "Before",
              "After"
            ],
            "rows": [
              [
                "AUC-ROC",
                "0.74",
                "0.91"
              ],
              [
                "Quarterly churn",
                "9.0%",
                "6.8%"
              ]
            ]
          }
        ]
      }
    ],
    "quote": "A model nobody understands is a model nobody uses."
  }
] satisfies CaseStudyDto[];

export default caseStudies;
