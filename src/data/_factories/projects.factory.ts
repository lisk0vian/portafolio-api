// Factory for projects. Identifiers/stack/links stay neutral;
// narrative fields (title/description/role/results) are localized.
import type { ProjectDto } from '../../modules/projects/projects.dto.js';
import {
  LocalizedFactory,
  LocaleScope,
  type ContentLang,
} from './localized.factory.js';

export type ProjectCommon = Pick<
  ProjectDto,
  'slug' | 'stack' | 'year' | 'links' | 'featured' | 'editions'
>;
export type ProjectLocalized = Pick<
  ProjectDto,
  | 'title'
  | 'description'
  | 'metric'
  | 'role'
  | 'problem'
  | 'approach'
  | 'result'
  | 'results'
  | 'resultsCaption'
>;

export class ProjectLocale extends LocaleScope<
  ProjectCommon,
  ProjectLocalized
> {
  title(value: string): this {
    return this.set('title', value);
  }

  description(value: string): this {
    return this.set('description', value);
  }

  metric(value: string): this {
    return this.set('metric', value);
  }

  role(value: string): this {
    return this.set('role', value);
  }

  problem(value: string): this {
    return this.set('problem', value);
  }

  approach(value: string): this {
    return this.set('approach', value);
  }

  result(value: string): this {
    return this.set('result', value);
  }

  results(value: ProjectLocalized['results']): this {
    return this.set('results', value);
  }

  resultsCaption(value: string): this {
    return this.set('resultsCaption', value);
  }
}

export class ProjectFactory extends LocalizedFactory<
  ProjectCommon,
  ProjectLocalized,
  ProjectDto,
  ProjectLocale
> {
  slug(value: string): this {
    return this.setCommon('slug', value);
  }

  stack(value: string[]): this {
    return this.setCommon('stack', value);
  }

  year(value: number): this {
    return this.setCommon('year', value);
  }

  links(value: ProjectCommon['links']): this {
    return this.setCommon('links', value);
  }

  featured(value: boolean): this {
    return this.setCommon('featured', value);
  }

  editions(value: ProjectCommon['editions']): this {
    return this.setCommon('editions', value);
  }

  protected scope(
    lang: ContentLang,
    common: Readonly<ProjectCommon>,
  ): ProjectLocale {
    return new ProjectLocale(common, lang);
  }

  protected requiredLocalized = ['title', 'description'] as const;

  protected merge(
    common: ProjectCommon,
    localized: ProjectLocalized,
  ): ProjectDto {
    return { ...common, ...localized };
  }
}
