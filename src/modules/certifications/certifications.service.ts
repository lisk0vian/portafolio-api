import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import certificationsEn from '../../data/en/certifications.js';
import certificationsEs from '../../data/es/certifications.js';
import {
  CertificationDto,
  type CertificationsQueryDto,
} from './certifications.dto.js';

const CERTIFICATIONS_BY_LANGUAGE: Record<SupportedLanguage, CertificationDto[]> = {
  en: certificationsEn,
  es: certificationsEs,
};

const FIELD_ALLOWLIST = new Set([
  'slug',
  'title',
  'issuer',
  'category',
  'tags',
  'issueDate',
  'expiryDate',
  'credentialId',
  'credentialUrl',
  'skills',
  'featured',
]);

function isExpired(cert: CertificationDto, now: Date = new Date()): boolean {
  if (!cert.expiryDate) return false;
  return new Date(`${cert.expiryDate}-01T00:00:00`) < now;
}

// Projects the certification to the requested fields.
// slug is always included so clients can fetch the detail later.
function pickFields(
  cert: CertificationDto,
  fields?: string,
): Partial<CertificationDto> {
  if (!fields) return cert;
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
    names.map((name) => [name, cert[name as keyof CertificationDto]]),
  );
}

@Injectable()
export class CertificationsService {
  findAll(
    lang: SupportedLanguage,
    query: CertificationsQueryDto,
  ): Partial<CertificationDto>[] {
    let result = [...CERTIFICATIONS_BY_LANGUAGE[lang]];
    if (query.search) {
      const search = query.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(search) ||
          c.issuer.toLowerCase().includes(search),
      );
    }
    if (query.issuer) {
      const issuer = query.issuer.toLowerCase();
      result = result.filter((c) => c.issuer.toLowerCase().includes(issuer));
    }
    if (query.skill) {
      const skill = query.skill.toLowerCase();
      result = result.filter((c) =>
        c.skills.some((s) => s.toLowerCase().includes(skill)),
      );
    }
    if (query.category) {
      const category = query.category.toLowerCase();
      result = result.filter(
        (c) => c.category.toLowerCase() === category,
      );
    }
    if (query.tag) {
      const tags = new Set(
        query.tag
          .split(',')
          .map((t) => t.trim().toLowerCase())
          .filter((t) => t !== ''),
      );
      result = result.filter((c) =>
        c.tags.some((t) => tags.has(t.toLowerCase())),
      );
    }
    if (query.featured !== undefined) {
      const featured = query.featured === 'true';
      result = result.filter((c) => c.featured === featured);
    }
    if (query.expired !== undefined) {
      const expired = query.expired === 'true';
      result = result.filter((c) => isExpired(c) === expired);
    }
    return result
      .slice(0, query.limit ?? 20)
      .map((c) => pickFields(c, query.fields));
  }

  findOne(
    lang: SupportedLanguage,
    slug: string,
    fields?: string,
  ): Partial<CertificationDto> {
    const cert = CERTIFICATIONS_BY_LANGUAGE[lang].find((c) => c.slug === slug);
    if (!cert) throw new NotFoundException(`Certification '${slug}' not found`);
    return pickFields(cert, fields);
  }
}
