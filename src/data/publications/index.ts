// Publications in display order.
import type { PublicationDto } from '../../modules/publications/publications.dto.js';
import exampleJournalPaper from './example-journal-paper.js';
import exampleConferencePaper from './example-conference-paper.js';

const entries = [exampleJournalPaper, exampleConferencePaper];

export const publicationsEn: PublicationDto[] = entries.map((e) => e.en);
export const publicationsEs: PublicationDto[] = entries.map((e) => e.es);
