import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

// Documents the header-based language negotiation in Swagger.
// Endpoints keep stable URLs; only the header changes the language.
export function ApiLanguageHeader() {
  return applyDecorators(
    ApiHeader({
      name: 'Accept-Language',
      description: "Response language: 'en' or 'es'. Defaults to 'en'.",
      required: false,
      schema: { type: 'string', enum: ['en', 'es'], default: 'en' },
    }),
    ApiHeader({
      name: 'x-lang',
      description: "Explicit override for 'Accept-Language'.",
      required: false,
      schema: { type: 'string', enum: ['en', 'es'] },
    }),
  );
}
