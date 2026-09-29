import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import { projectsEn, projectsEs } from '../../data/projects/index.js';
import { ProjectDto, type ProjectsQueryDto } from './projects.dto.js';

const PROJECTS_BY_LANGUAGE: Record<SupportedLanguage, ProjectDto[]> = {
  en: projectsEn,
  es: projectsEs,
};

const FIELD_ALLOWLIST = new Set([
  'slug',
  'title',
  'description',
  'stack',
  'featured',
  'year',
  'links',
  'metric',
  'role',
  'problem',
  'approach',
  'result',
  'results',
  'resultsCaption',
  'editions',
]);

// Projects the project to the requested fields.
// slug is always included so clients can fetch the detail later.
function pickFields(project: ProjectDto, fields?: string): Partial<ProjectDto> {
  if (!fields) return project;
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
    names.map((name) => [name, project[name as keyof ProjectDto]]),
  );
}

@Injectable()
export class ProjectsService {
  findAll(
    lang: SupportedLanguage,
    query: ProjectsQueryDto,
  ): Partial<ProjectDto>[] {
    let result = [...PROJECTS_BY_LANGUAGE[lang]];
    if (query.featured !== undefined) {
      const featured = query.featured === 'true';
      result = result.filter((p) => p.featured === featured);
    }
    if (query.stack) {
      const stack = query.stack.toLowerCase();
      result = result.filter((p) =>
        p.stack.some((s) => s.toLowerCase().includes(stack)),
      );
    }
    return result
      .slice(0, query.limit ?? 20)
      .map((p) => pickFields(p, query.fields));
  }

  findOne(
    lang: SupportedLanguage,
    slug: string,
    fields?: string,
  ): Partial<ProjectDto> {
    const project = PROJECTS_BY_LANGUAGE[lang].find((p) => p.slug === slug);
    if (!project) throw new NotFoundException(`Project '${slug}' not found`);
    return pickFields(project, fields);
  }
}
