import { Injectable, NotFoundException } from '@nestjs/common';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import projectsEn from '../../data/en/projects.js';
import projectsEs from '../../data/es/projects.js';
import { ProjectDto, type ProjectsQueryDto } from './projects.dto.js';

const PROJECTS_BY_LANGUAGE: Record<SupportedLanguage, ProjectDto[]> = {
  en: projectsEn,
  es: projectsEs,
};

@Injectable()
export class ProjectsService {
  findAll(lang: SupportedLanguage, query: ProjectsQueryDto): ProjectDto[] {
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
    return result.slice(0, query.limit ?? 20);
  }

  findOne(lang: SupportedLanguage, slug: string): ProjectDto {
    const project = PROJECTS_BY_LANGUAGE[lang].find((p) => p.slug === slug);
    if (!project) throw new NotFoundException(`Project '${slug}' not found`);
    return project;
  }
}
