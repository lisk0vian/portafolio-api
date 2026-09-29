// Publication: example journal paper.
import { PublicationFactory } from '../_factories/publications.factory.js';

const base = new PublicationFactory()
  .slug('example-journal-paper')
  .title('Example Journal Paper on Applied Research')
  .authors(['Jane Doe', 'John Smith'])
  .venue('Journal of Examples')
  .type('journal')
  .year(2024)
  .publishedAt('2024-06')
  .doi('https://doi.org/10.0000/example-journal')
  .pdfUrl('https://example.com/papers/example-journal.pdf')
  .keywords(['research', 'example'])
  .featured(true);

const en = base
  .locale('en')
  .abstract('Example abstract in English. Replace with your real abstract.')
  .pages('Vol. 12 · pp. 45–67')
  .language('English');

const es = base
  .locale('es')
  .abstract('Resumen de ejemplo en español. Reemplázalo con tu resumen real.')
  .pages('Vol. 12 · pp. 45–67')
  .language('Inglés');

export default base.assemble(en, es);
