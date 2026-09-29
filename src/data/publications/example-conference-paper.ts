// Publication: example conference paper.
import { PublicationFactory } from '../_factories/publications.factory.js';

const base = new PublicationFactory()
  .slug('example-conference-paper')
  .title('Example Conference Paper from a Call for Papers')
  .authors(['Jane Doe'])
  .venue('International Conference of Examples')
  .type('conference')
  .year(2025)
  .publishedAt('2025-03')
  .doi('https://doi.org/10.0000/example-conference')
  .pdfUrl('https://example.com/papers/example-conference.pdf')
  .url('https://example.com/conference/program')
  .keywords(['conference', 'example'])
  .featured(false);

const en = base
  .locale('en')
  .abstract(
    'Example conference abstract in English. Replace with your real abstract.',
  )
  .pages('Proceedings · pp. 101–110')
  .language('English');

const es = base
  .locale('es')
  .abstract(
    'Resumen de conferencia de ejemplo en español. Reemplázalo con tu resumen real.',
  )
  .pages('Actas · pp. 101–110')
  .language('Inglés');

export default base.assemble(en, es);
