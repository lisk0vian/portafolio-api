import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiLanguageHeader } from '../../common/language/api-language-header.decorator.js';
import { ApiVersionHeader } from '../../common/versioning/api-version-header.decorator.js';
import { Language } from '../../common/language/language.decorator.js';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import {
  CertificationDto,
  CertificationGroupDto,
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

  // Static 'groups' routes must be declared before ':slug',
  // otherwise 'groups' is captured as a certification slug.
  @Get('groups')
  @ApiOkResponse({ type: [CertificationGroupDto] })
  findGroups(@Language() lang: SupportedLanguage): CertificationGroupDto[] {
    return this.service.findGroups(lang);
  }

  @Get('groups/:group')
  @ApiParam({
    name: 'group',
    description: 'Single group slug, matched against tags (e.g. aws).',
  })
  @ApiOkResponse({ type: [CertificationDto] })
  findByGroup(
    @Language() lang: SupportedLanguage,
    @Param('group') group: string,
    @Query() query: CertificationsQueryDto,
  ): Partial<CertificationDto>[] {
    return this.service.findByGroup(lang, group, query);
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
