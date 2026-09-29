import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import {
  certificationsEn,
  certificationsEs,
} from '../../data/certifications/index.js';
import {
  CertificationDto,
  CertificationGroupDto,
  CertificationsQueryDto,
} from './certifications.dto.js';

const CERTIFICATIONS_BY_LANGUAGE: Record<
  SupportedLanguage,
  CertificationDto[]
> = {
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
  'level',
  'featured',
]);

function isExpired(cert: CertificationDto, now: Date = new Date()): boolean {
  if (!cert.expiryDate) return false;
  return new Date(`${cert.expiryDate}-01T00:00:00`) < now;
}

// Groups are single tag slugs (e.g. aws). Tags accept CSV with OR logic;
// group accepts exactly one value so URLs stay shareable per vendor.
function normalizeGroup(raw: string): string {
  const group = raw.trim().toLowerCase();
  if (!group) {
    throw new BadRequestException('Group must be a non-empty value');
  }
  if (group.includes(',')) {
    throw new BadRequestException(
      'Group accepts a single value; use tag for multiple values',
    );
  }
  return group;
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
      result = result.filter((c) => c.category.toLowerCase() === category);
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
    if (query.group !== undefined) {
      const group = normalizeGroup(query.group);
      result = result.filter((c) =>
        c.tags.some((t) => t.toLowerCase() === group),
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
    const offset = query.offset ?? 0;
    const limit = query.limit ?? 20;
    return result
      .slice(offset, offset + limit)
      .map((c) => pickFields(c, query.fields));
  }

  findGroups(lang: SupportedLanguage): CertificationGroupDto[] {
    const byGroup = new Map<string, CertificationDto[]>();
    for (const cert of CERTIFICATIONS_BY_LANGUAGE[lang]) {
      for (const tag of cert.tags) {
        const group = tag.trim().toLowerCase();
        if (!group) continue;
        const list = byGroup.get(group) ?? [];
        list.push(cert);
        byGroup.set(group, list);
      }
    }
    return [...byGroup.entries()]
      .map(([group, certs]) => {
        const years = certs.map((c) => Number(c.issueDate.slice(0, 4)));
        const latest = [...certs].sort((a, b) =>
          b.issueDate.localeCompare(a.issueDate),
        )[0];
        return {
          group,
          count: certs.length,
          latest: {
            title: latest.title,
            ...(latest.level !== undefined ? { level: latest.level } : {}),
            year: Number(latest.issueDate.slice(0, 4)),
          },
          fromYear: Math.min(...years),
          toYear: Math.max(...years),
        };
      })
      .sort((a, b) => a.group.localeCompare(b.group));
  }

  findByGroup(
    lang: SupportedLanguage,
    group: string,
    query: CertificationsQueryDto,
  ): Partial<CertificationDto>[] {
    const normalized = normalizeGroup(group);
    if (query.group !== undefined) {
      throw new BadRequestException(
        "Query param 'group' is not allowed here; group is already in the path",
      );
    }
    return this.findAll(
      lang,
      Object.assign(new CertificationsQueryDto(), query, {
        group: normalized,
      }),
    );
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
