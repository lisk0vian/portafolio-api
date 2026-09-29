// Project: churn prediction.
import { ProjectFactory } from '../_factories/projects.factory.js';

const base = new ProjectFactory()
  .slug('churn-prediction')
  .stack(['Python', 'XGBoost', 'SHAP', 'dbt'])
  .year(2026)
  .links({})
  .featured(false)
  .editions(['data']);

const en = base
  .locale('en')
  .title('Churn prediction')
  .description(
    'Churn model with calibrated probabilities the sales team trusts. See the case study for details.',
  )
  .metric('AUC 0.91')
  .role('Data scientist')
  .problem('9% of customers churned each quarter and sales found out too late.')
  .approach(
    'Behavioral features in dbt, gradient boosting with temporal validation and per-customer SHAP explanations.',
  )
  .result('Quarterly churn dropped from 9.0% to 6.8%.')
  .results([
    { label: 'AUC-ROC', before: '0.74', after: '0.91' },
    { label: 'Precision @10%', before: '0.31', after: '0.62' },
    { label: 'Quarterly churn', before: '9.0%', after: '6.8%' },
  ])
  .resultsCaption('Evaluated out of sample, following quarter.');

const es = base
  .locale('es')
  .title('Predicción de churn')
  .description(
    'Modelo de churn con probabilidades calibradas en el que confía el equipo comercial. Ver el caso de estudio.',
  )
  .metric('AUC 0.91')
  .role('Científico de datos')
  .problem(
    'El 9% de los clientes cancelaba cada trimestre y ventas se enteraba demasiado tarde.',
  )
  .approach(
    'Variables de comportamiento con dbt, gradient boosting con validación temporal y explicaciones SHAP por cliente.',
  )
  .result('El churn trimestral bajó del 9,0% al 6,8%.')
  .results([
    { label: 'AUC-ROC', before: '0,74', after: '0,91' },
    { label: 'Precisión @10%', before: '0,31', after: '0,62' },
    { label: 'Churn trimestral', before: '9,0%', after: '6,8%' },
  ])
  .resultsCaption('Evaluado fuera de muestra, trimestre siguiente.');

export default base.assemble(en, es);
