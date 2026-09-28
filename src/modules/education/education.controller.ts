import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiLanguageHeader } from '../../common/language/api-language-header.decorator.js';
import { ApiVersionHeader } from '../../common/versioning/api-version-header.decorator.js';
import { Language } from '../../common/language/language.decorator.js';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import { EducationDto } from './education.dto.js';
import { EducationService } from './education.service.js';

@ApiTags('education')
@ApiLanguageHeader()
@ApiVersionHeader()
@Controller('education')
export class EducationController {
  constructor(private readonly service: EducationService) {}

  @Get()
  @ApiOkResponse({ type: [EducationDto] })
  findAll(@Language() lang: SupportedLanguage): EducationDto[] {
    return this.service.findAll(lang);
  }
}
