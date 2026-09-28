import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import {
  API_VERSION_HEADER,
  DEFAULT_API_VERSION,
  SUPPORTED_API_VERSIONS,
} from './api-version.const.js';

// Documents the header-based API version negotiation in Swagger.
// Endpoints keep stable URLs; only the header selects the version.
export function ApiVersionHeader() {
  return applyDecorators(
    ApiHeader({
      name: API_VERSION_HEADER,
      description: `API version. Defaults to '${DEFAULT_API_VERSION}'.`,
      required: false,
      schema: {
        type: 'string',
        enum: [...SUPPORTED_API_VERSIONS],
        default: DEFAULT_API_VERSION,
      },
    }),
  );
}
