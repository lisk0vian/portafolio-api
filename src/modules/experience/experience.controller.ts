import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiLanguageHeader } from '../../common/language/api-language-header.decorator.js';
import { ApiVersionHeader } from '../../common/versioning/api-version-header.decorator.js';
import { Language } from '../../common/language/language.decorator.js';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import { ExperienceDto } from './experience.dto.js';
import { ExperienceService } from './experience.service.js';

@ApiTags('experience')
@ApiLanguageHeader()
@ApiVersionHeader()
@Controller('experience')
export class ExperienceController {
  constructor(private readonly service: ExperienceService) {}

  @Get()
  @ApiOkResponse({ type: [ExperienceDto] })
  findAll(@Language() lang: SupportedLanguage): ExperienceDto[] {
    return this.service.findAll(lang);
  }
}
