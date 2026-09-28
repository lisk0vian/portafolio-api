import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiVersionHeader } from '../../common/versioning/api-version-header.decorator.js';

@ApiTags('health')
@ApiVersionHeader()
@Controller('health')
export class HealthController {
  @Get()
  check() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
