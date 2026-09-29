import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiLanguageHeader } from '../../common/language/api-language-header.decorator.js';
import { ApiVersionHeader } from '../../common/versioning/api-version-header.decorator.js';
import { Language } from '../../common/language/language.decorator.js';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import {
  PublicationDto,
  PublicationsQueryDto,
} from './publications.dto.js';
import { PublicationsService } from './publications.service.js';

@ApiTags('publications')
@ApiLanguageHeader()
@ApiVersionHeader()
@Controller('publications')
export class PublicationsController {
  constructor(private readonly service: PublicationsService) {}

  @Get()
  @ApiOkResponse({ type: [PublicationDto] })
  findAll(
    @Language() lang: SupportedLanguage,
    @Query() query: PublicationsQueryDto,
  ): Partial<PublicationDto>[] {
    return this.service.findAll(lang, query);
  }

  @Get(':slug')
  @ApiOkResponse({ type: PublicationDto })
  findOne(
    @Language() lang: SupportedLanguage,
    @Param('slug') slug: string,
    @Query('fields') fields?: string,
  ): Partial<PublicationDto> {
    return this.service.findOne(lang, slug, fields);
  }
}
