import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiLanguageHeader } from '../../common/language/api-language-header.decorator.js';
import { ApiVersionHeader } from '../../common/versioning/api-version-header.decorator.js';
import { Language } from '../../common/language/language.decorator.js';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import { ProjectDto, ProjectsQueryDto } from './projects.dto.js';
import { ProjectsService } from './projects.service.js';

@ApiTags('projects')
@ApiLanguageHeader()
@ApiVersionHeader()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Get()
  @ApiOkResponse({ type: [ProjectDto] })
  findAll(
    @Language() lang: SupportedLanguage,
    @Query() query: ProjectsQueryDto,
  ): ProjectDto[] {
    return this.service.findAll(lang, query);
  }

  @Get(':slug')
  @ApiOkResponse({ type: ProjectDto })
  findOne(
    @Language() lang: SupportedLanguage,
    @Param('slug') slug: string,
  ): ProjectDto {
    return this.service.findOne(lang, slug);
  }
}
