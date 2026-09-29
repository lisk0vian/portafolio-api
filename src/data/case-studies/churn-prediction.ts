// Case study: churn prediction.
import { CaseStudyFactory } from '../_factories/case-studies.factory.js';

const base = new CaseStudyFactory()
  .slug('churn-prediction')
  .projectSlug('churn-prediction')
  .tags(['data', 'ml'])
  .publishedAt('2026-08');

const en = base
  .locale('en')
  .title('Churn prediction')
  .deck('A churn model the sales team understands, uses and trusts.')
  .meta([
    { label: 'Role', value: 'Data scientist' },
    { label: 'Year', value: '2026' },
    { label: 'Duration', value: '4 months' },
    { label: 'Stack', value: 'Python · XGBoost · SHAP · dbt' },
  ])
  .coverImage({
    src: 'https://example.com/cases/churn-cover.png',
    alt: 'ROC curve and SHAP plot',
    caption: 'Feature importance (SHAP) on the validation set.',
  })
  .sections([
    {
      id: 'problem',
      title: 'Problem',
      blocks: [
        {
          type: 'paragraph',
          text: '9% of customers churned every quarter and the sales team only found out when it was too late to act.',
        },
      ],
    },
    {
      id: 'model',
      title: 'Model',
      blocks: [
        {
          type: 'paragraph',
          text: 'Time-window validation to avoid leakage, probability calibration and a threshold chosen from the real capacity of the sales team.',
        },
        {
          type: 'code',
          language: 'python',
          source:
            'model = xgb.XGBClassifier(n_estimators=600, max_depth=5)\nmodel.fit(X_train, y_train)',
          caption: 'Listing 1 — Training.',
        },
      ],
    },
    {
      id: 'results',
      title: 'Results',
      blocks: [
        {
          type: 'table',
          caption: 'Out-of-sample results on the following quarter.',
          headers: ['Metric', 'Before', 'After'],
          rows: [
            ['AUC-ROC', '0.74', '0.91'],
            ['Quarterly churn', '9.0%', '6.8%'],
          ],
        },
      ],
    },
  ])
  .quote('A model nobody understands is a model nobody uses.');

const es = base
  .locale('es')
  .title('Predicción de abandono')
  .deck(
    'Un modelo de churn que el equipo comercial entiende, usa y en el que confía.',
  )
  .meta([
    { label: 'Rol', value: 'Científico de datos' },
    { label: 'Año', value: '2026' },
    { label: 'Duración', value: '4 meses' },
    { label: 'Stack', value: 'Python · XGBoost · SHAP · dbt' },
  ])
  .coverImage({
    src: 'https://example.com/cases/churn-cover.png',
    alt: 'Curva ROC y gráfico SHAP',
    caption: 'Importancia de variables (SHAP) sobre el conjunto de validación.',
  })
  .sections([
    {
      id: 'problem',
      title: 'Problema',
      blocks: [
        {
          type: 'paragraph',
          text: 'El 9% de los clientes cancelaba cada trimestre y el equipo comercial solo se enteraba cuando ya era tarde para actuar.',
        },
      ],
    },
    {
      id: 'model',
      title: 'Modelo',
      blocks: [
        {
          type: 'paragraph',
          text: 'Validación por ventanas de tiempo para evitar fuga de información y un umbral elegido según la capacidad real del equipo comercial.',
        },
        {
          type: 'code',
          language: 'python',
          source:
            'model = xgb.XGBClassifier(n_estimators=600, max_depth=5)\nmodel.fit(X_train, y_train)',
          caption: 'Listado 1 — Entrenamiento.',
        },
      ],
    },
    {
      id: 'results',
      title: 'Resultados',
      blocks: [
        {
          type: 'table',
          caption: 'Resultados fuera de muestra sobre el trimestre siguiente.',
          headers: ['Métrica', 'Antes', 'Después'],
          rows: [
            ['AUC-ROC', '0.74', '0.91'],
            ['Churn trimestral', '9.0%', '6.8%'],
          ],
        },
      ],
    },
  ])
  .quote('Un modelo que nadie entiende es un modelo que nadie usa.');

export default base.assemble(en, es);
