import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiLanguageHeader } from '../../common/language/api-language-header.decorator.js';
import { ApiVersionHeader } from '../../common/versioning/api-version-header.decorator.js';
import { Language } from '../../common/language/language.decorator.js';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import {
  CaseStudiesQueryDto,
  CaseStudyDto,
} from './case-studies.dto.js';
import { CaseStudiesService } from './case-studies.service.js';

@ApiTags('case-studies')
@ApiLanguageHeader()
@ApiVersionHeader()
@Controller('case-studies')
export class CaseStudiesController {
  constructor(private readonly service: CaseStudiesService) {}

  @Get()
  @ApiOkResponse({ type: [CaseStudyDto] })
  findAll(
    @Language() lang: SupportedLanguage,
    @Query() query: CaseStudiesQueryDto,
  ): Partial<CaseStudyDto>[] {
    return this.service.findAll(lang, query);
  }

  @Get(':slug')
  @ApiOkResponse({ type: CaseStudyDto })
  findOne(
    @Language() lang: SupportedLanguage,
    @Param('slug') slug: string,
    @Query('fields') fields?: string,
  ): Partial<CaseStudyDto> {
    return this.service.findOne(lang, slug, fields);
  }
}
