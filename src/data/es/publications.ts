import type { PublicationDto } from '../../modules/publications/publications.dto.js';

// Static content for the publications section (es).
// TODO: replace these example entries with your real journal and
// conference papers. Same slugs as the en file, title/venue stay in
// their original language, only abstract is translated.
const publications = [
  {
    "slug": "example-journal-paper",
    "title": "Example Journal Paper on Applied Research",
    "authors": ["Jane Doe", "John Smith"],
    "venue": "Journal of Examples",
    "type": "journal",
    "year": 2024,
    "publishedAt": "2024-06",
    "doi": "https://doi.org/10.0000/example-journal",
    "pdfUrl": "https://example.com/papers/example-journal.pdf",
    "abstract": "Resumen de ejemplo en español. Reemplázalo con tu resumen real.",
    "keywords": ["research", "example"],
    "featured": true,
    "pages": "Vol. 12 · pp. 45–67",
    "language": "Inglés"
  },
  {
    "slug": "example-conference-paper",
    "title": "Example Conference Paper from a Call for Papers",
    "authors": ["Jane Doe"],
    "venue": "International Conference of Examples",
    "type": "conference",
    "year": 2025,
    "publishedAt": "2025-03",
    "doi": "https://doi.org/10.0000/example-conference",
    "pdfUrl": "https://example.com/papers/example-conference.pdf",
    "url": "https://example.com/conference/program",
    "abstract": "Resumen de conferencia de ejemplo en español. Reemplázalo con tu resumen real.",
    "keywords": ["conference", "example"],
    "featured": false,
    "pages": "Actas · pp. 101–110",
    "language": "Inglés"
  }
] satisfies PublicationDto[];

export default publications;
