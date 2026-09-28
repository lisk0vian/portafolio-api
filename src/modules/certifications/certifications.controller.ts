import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiLanguageHeader } from '../../common/language/api-language-header.decorator.js';
import { ApiVersionHeader } from '../../common/versioning/api-version-header.decorator.js';
import { Language } from '../../common/language/language.decorator.js';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import {
  CertificationDto,
  CertificationsQueryDto,
} from './certifications.dto.js';
import { CertificationsService } from './certifications.service.js';

@ApiTags('certifications')
@ApiLanguageHeader()
@ApiVersionHeader()
@Controller('certifications')
export class CertificationsController {
  constructor(private readonly service: CertificationsService) {}

  @Get()
  @ApiOkResponse({ type: [CertificationDto] })
  findAll(
    @Language() lang: SupportedLanguage,
    @Query() query: CertificationsQueryDto,
  ): Partial<CertificationDto>[] {
    return this.service.findAll(lang, query);
  }

  @Get(':slug')
  @ApiOkResponse({ type: CertificationDto })
  findOne(
    @Language() lang: SupportedLanguage,
    @Param('slug') slug: string,
    @Query('fields') fields?: string,
  ): Partial<CertificationDto> {
    return this.service.findOne(lang, slug, fields);
  }
}
