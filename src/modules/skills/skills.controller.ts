import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiLanguageHeader } from '../../common/language/api-language-header.decorator.js';
import { ApiVersionHeader } from '../../common/versioning/api-version-header.decorator.js';
import { Language } from '../../common/language/language.decorator.js';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import { SkillGroupDto } from './skills.dto.js';
import { SkillsService } from './skills.service.js';

@ApiTags('skills')
@ApiLanguageHeader()
@ApiVersionHeader()
@Controller('skills')
export class SkillsController {
  constructor(private readonly service: SkillsService) {}

  @Get()
  @ApiOkResponse({ type: [SkillGroupDto] })
  findAll(@Language() lang: SupportedLanguage): SkillGroupDto[] {
    return this.service.findAll(lang);
  }
}
