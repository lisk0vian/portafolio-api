import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { resolveLanguage } from './language.util.js';
import type { SupportedLanguage } from './language.const.js';

// Extracts the response language from request headers so URLs stay stable.
// Priority: 'x-lang' (explicit override) -> 'accept-language' (standard).
// Usage: findAll(@Language() lang: SupportedLanguage)
export const Language = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): SupportedLanguage => {
    const request = ctx.switchToHttp().getRequest<{
      headers: Record<string, unknown>;
    }>();
    const override = request.headers['x-lang'];
    const standard = request.headers['accept-language'];
    return resolveLanguage(
      typeof override === 'string' && override.trim() !== ''
        ? override
        : standard,
    );
  },
);
