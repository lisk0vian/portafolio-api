import type { PublicationDto } from '../../modules/publications/publications.dto.js';

// Static content for the publications section (en).
// TODO: replace these example entries with your real journal and
// conference papers. Keep slugs identical in the es file, keep
// title/venue in their original language, translate only abstract.
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
    "abstract": "Example abstract in English. Replace with your real abstract.",
    "keywords": ["research", "example"],
    "featured": true,
    "pages": "Vol. 12 · pp. 45–67",
    "language": "English"
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
    "abstract": "Example conference abstract in English. Replace with your real abstract.",
    "keywords": ["conference", "example"],
    "featured": false,
    "pages": "Proceedings · pp. 101–110",
    "language": "English"
  }
] satisfies PublicationDto[];

export default publications;
