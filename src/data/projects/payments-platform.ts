// Project: payments platform.
import { ProjectFactory } from '../_factories/projects.factory.js';

const base = new ProjectFactory()
  .slug('payments-platform')
  .stack(['Go', 'PostgreSQL', 'React', 'AWS'])
  .year(2026)
  .links({})
  .featured(false)
  .editions(['fullstack']);

const en = base
  .locale('en')
  .title('Payments platform')
  .description(
    'Payment reconciliation for 4,000 merchants with a double-entry ledger. See the case study for details.',
  )
  .metric('p95 840ms → 120ms')
  .role('Tech lead')
  .problem(
    'Reconciliation ran on nightly scripts; errors took days to surface.',
  )
  .approach(
    'Immutable double-entry ledger with event ingestion split from balance computation.',
  )
  .result('Support went from 310 to 45 weekly tickets.')
  .results([
    { label: 'p95 latency', before: '840 ms', after: '120 ms' },
    { label: 'Tickets / week', before: '310', after: '45' },
    { label: 'Reconciliation', before: '24 h', after: '5 min' },
  ])
  .resultsCaption('Measured after three months in production.');

const es = base
  .locale('es')
  .title('Plataforma de pagos')
  .description(
    'Conciliación de pagos para 4.000 comercios con ledger de doble entrada. Ver el caso de estudio.',
  )
  .metric('p95 840ms → 120ms')
  .role('Líder técnico')
  .problem(
    'La conciliación se hacía con scripts nocturnos; los errores tardaban días en aparecer.',
  )
  .approach(
    'Libro contable inmutable de doble entrada, con ingesta de eventos separada del cálculo de saldos.',
  )
  .result('Soporte pasó de 310 a 45 tickets semanales.')
  .results([
    { label: 'Latencia p95', before: '840 ms', after: '120 ms' },
    { label: 'Tickets / semana', before: '310', after: '45' },
    { label: 'Conciliación', before: '24 h', after: '5 min' },
  ])
  .resultsCaption('Medido tras tres meses en producción.');

export default base.assemble(en, es);
