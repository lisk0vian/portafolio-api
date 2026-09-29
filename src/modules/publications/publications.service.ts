import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import {
  publicationsEn,
  publicationsEs,
} from '../../data/publications/index.js';
import {
  PublicationDto,
  PublicationsQueryDto,
} from './publications.dto.js';

const PUBLICATIONS_BY_LANGUAGE: Record<SupportedLanguage, PublicationDto[]> = {
  en: publicationsEn,
  es: publicationsEs,
};

const FIELD_ALLOWLIST = new Set([
  'slug',
  'title',
  'authors',
  'venue',
  'type',
  'year',
  'publishedAt',
  'doi',
  'pdfUrl',
  'url',
  'abstract',
  'keywords',
  'featured',
  'pages',
  'language',
]);

// Projects the publication to the requested fields.
// slug is always included so clients can fetch the detail later.
function pickFields(
  publication: PublicationDto,
  fields?: string,
): Partial<PublicationDto> {
  if (!fields) return publication;
  const requested = fields
    .split(',')
    .map((f) => f.trim())
    .filter((f) => f !== '');
  const unknown = requested.filter((f) => !FIELD_ALLOWLIST.has(f));
  if (unknown.length > 0) {
    throw new BadRequestException(`Unknown field(s): ${unknown.join(', ')}`);
  }
  const names = ['slug', ...requested.filter((f) => f !== 'slug')];
  return Object.fromEntries(
    names.map((name) => [name, publication[name as keyof PublicationDto]]),
  );
}

@Injectable()
export class PublicationsService {
  findAll(
    lang: SupportedLanguage,
    query: PublicationsQueryDto,
  ): Partial<PublicationDto>[] {
    let result = [...PUBLICATIONS_BY_LANGUAGE[lang]];
    if (query.type) {
      const type = query.type.toLowerCase();
      result = result.filter((p) => p.type.toLowerCase() === type);
    }
    if (query.year !== undefined) {
      result = result.filter((p) => p.year === query.year);
    }
    if (query.search) {
      const search = query.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.venue.toLowerCase().includes(search) ||
          p.abstract.toLowerCase().includes(search),
      );
    }
    if (query.tag) {
      const tags = new Set(
        query.tag
          .split(',')
          .map((t) => t.trim().toLowerCase())
          .filter((t) => t !== ''),
      );
      result = result.filter((p) =>
        p.keywords.some((k) => tags.has(k.toLowerCase())),
      );
    }
    if (query.featured !== undefined) {
      const featured = query.featured === 'true';
      result = result.filter((p) => p.featured === featured);
    }
    return result
      .slice(0, query.limit ?? 20)
      .map((p) => pickFields(p, query.fields));
  }

  findOne(
    lang: SupportedLanguage,
    slug: string,
    fields?: string,
  ): Partial<PublicationDto> {
    const publication = PUBLICATIONS_BY_LANGUAGE[lang].find(
      (p) => p.slug === slug,
    );
    if (!publication)
      throw new NotFoundException(`Publication '${slug}' not found`);
    return pickFields(publication, fields);
  }
}
