import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiLanguageHeader } from '../../common/language/api-language-header.decorator.js';
import { ApiVersionHeader } from '../../common/versioning/api-version-header.decorator.js';
import { Language } from '../../common/language/language.decorator.js';
import type { SupportedLanguage } from '../../common/language/language.const.js';
import { ProfileDto } from './profile.dto.js';
import { ProfileService } from './profile.service.js';

@ApiTags('profile')
@ApiLanguageHeader()
@ApiVersionHeader()
@Controller('profile')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get()
  @ApiOkResponse({ type: ProfileDto })
  findOne(@Language() lang: SupportedLanguage): ProfileDto {
    return this.service.findOne(lang);
  }
}
