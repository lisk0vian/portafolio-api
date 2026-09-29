// Case study: payments platform.
import { CaseStudyFactory } from '../_factories/case-studies.factory.js';

const base = new CaseStudyFactory()
  .slug('payments-platform')
  .projectSlug('payments-platform')
  .tags(['fintech', 'backend'])
  .publishedAt('2026-05')
  .nextCaseSlug('churn-prediction');

const en = base
  .locale('en')
  .title('Payments platform')
  .deck(
    'How we redesigned payment reconciliation for 4,000 merchants without stopping the service.',
  )
  .meta([
    { label: 'Role', value: 'Tech lead · Engineering' },
    { label: 'Year', value: '2026' },
    { label: 'Duration', value: '7 months' },
    { label: 'Stack', value: 'Go · PostgreSQL · React · AWS' },
  ])
  .coverImage({
    src: 'https://example.com/cases/payments-cover.png',
    alt: 'Reconciliation dashboard screenshot',
    caption: 'Near real-time reconciliation dashboard.',
  })
  .sections([
    {
      id: 'problem',
      title: 'Problem',
      blocks: [
        {
          type: 'paragraph',
          text: 'Reconciliation ran on nightly scripts and spreadsheets. Errors took days to surface and support received hundreds of tickets a week.',
        },
      ],
    },
    {
      id: 'approach',
      title: 'Approach',
      blocks: [
        {
          type: 'paragraph',
          text: 'We split event ingestion from balance computation and introduced a double-entry ledger.',
        },
        {
          type: 'diagram',
          format: 'mermaid',
          source:
            'graph TD; Events-->Ledger; Ledger-->Balances; Balances-->Dashboard;',
          caption: 'Event flow from ingestion to dashboard.',
        },
      ],
    },
    {
      id: 'architecture',
      title: 'Architecture',
      blocks: [
        {
          type: 'paragraph',
          text: 'Every movement is an immutable entry. Balances are derived, never edited.',
        },
        {
          type: 'code',
          language: 'go',
          source:
            '// ledger/entry.go\ntype Entry struct {\n  ID       uuid.UUID\n  Account  string\n  Amount   decimal.Decimal\n  PostedAt time.Time\n}',
          caption: 'Listing 1 — Ledger entry structure.',
        },
        {
          type: 'image',
          src: 'https://example.com/cases/payments-architecture.png',
          alt: 'Ledger architecture diagram',
          caption: 'Fig. 2 — Ledger and balance derivation.',
        },
      ],
    },
    {
      id: 'results',
      title: 'Results',
      blocks: [
        {
          type: 'paragraph',
          text: 'After three months in production, these were the measured changes:',
        },
        {
          type: 'table',
          caption: 'Measured changes after three months.',
          headers: ['Metric', 'Before', 'After'],
          rows: [
            ['API p95 latency', '840 ms', '120 ms'],
            ['Support tickets / week', '310', '45'],
          ],
        },
        {
          type: 'metrics',
          items: [
            { label: 'Reconciliation time', value: '5 min' },
            { label: 'Audit findings', value: '0' },
          ],
        },
      ],
    },
    {
      id: 'lessons',
      title: 'Lessons',
      blocks: [
        {
          type: 'paragraph',
          text: 'A correct data model simplifies more code than any framework.',
        },
      ],
    },
  ])
  .quote(
    'The dashboard was what people saw; the ledger is what solved the problem.',
  );

const es = base
  .locale('es')
  .title('Plataforma de pagos')
  .deck(
    'Cómo rediseñamos la conciliación de pagos para 4.000 comercios sin detener el servicio.',
  )
  .meta([
    { label: 'Rol', value: 'Líder técnico · Ingeniería' },
    { label: 'Año', value: '2026' },
    { label: 'Duración', value: '7 meses' },
    { label: 'Stack', value: 'Go · PostgreSQL · React · AWS' },
  ])
  .coverImage({
    src: 'https://example.com/cases/payments-cover.png',
    alt: 'Captura del panel de conciliación',
    caption: 'Panel de conciliación en tiempo casi real.',
  })
  .sections([
    {
      id: 'problem',
      title: 'Problema',
      blocks: [
        {
          type: 'paragraph',
          text: 'La conciliación se hacía con scripts nocturnos y hojas de cálculo. Los errores tardaban días en detectarse y soporte recibía cientos de tickets por semana.',
        },
      ],
    },
    {
      id: 'approach',
      title: 'Enfoque',
      blocks: [
        {
          type: 'paragraph',
          text: 'Separamos la ingesta de eventos del cálculo de saldos e introdujimos un libro contable de doble entrada.',
        },
        {
          type: 'diagram',
          format: 'mermaid',
          source:
            'graph TD; Events-->Ledger; Ledger-->Balances; Balances-->Dashboard;',
          caption: 'Flujo de eventos desde la ingesta hasta el panel.',
        },
      ],
    },
    {
      id: 'architecture',
      title: 'Arquitectura',
      blocks: [
        {
          type: 'paragraph',
          text: 'Cada movimiento es un asiento inmutable. Los saldos se derivan, nunca se editan.',
        },
        {
          type: 'code',
          language: 'go',
          source:
            '// ledger/entry.go\ntype Entry struct {\n  ID       uuid.UUID\n  Account  string\n  Amount   decimal.Decimal\n  PostedAt time.Time\n}',
          caption: 'Listado 1 — Estructura de un asiento contable.',
        },
        {
          type: 'image',
          src: 'https://example.com/cases/payments-architecture.png',
          alt: 'Diagrama de arquitectura del libro contable',
          caption: 'Fig. 2 — Libro contable y derivación de saldos.',
        },
      ],
    },
    {
      id: 'results',
      title: 'Resultados',
      blocks: [
        {
          type: 'paragraph',
          text: 'Tras tres meses en producción, estos fueron los cambios medidos:',
        },
        {
          type: 'table',
          caption: 'Cambios medidos tras tres meses.',
          headers: ['Métrica', 'Antes', 'Después'],
          rows: [
            ['Latencia p95 de la API', '840 ms', '120 ms'],
            ['Tickets de soporte / semana', '310', '45'],
          ],
        },
        {
          type: 'metrics',
          items: [
            { label: 'Tiempo de conciliación', value: '5 min' },
            { label: 'Hallazgos de auditoría', value: '0' },
          ],
        },
      ],
    },
    {
      id: 'lessons',
      title: 'Aprendizajes',
      blocks: [
        {
          type: 'paragraph',
          text: 'Un modelo de datos correcto simplifica más código que cualquier framework.',
        },
      ],
    },
  ])
  .quote(
    'El panel fue lo visible; el libro contable fue lo que resolvió el problema.',
  );

export default base.assemble(en, es);
