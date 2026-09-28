import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from './language.const.js';

// Resolves 'en' | 'es' from a raw header value.
// Accepts values like 'es', 'es-ES', 'en-US', 'es-ES,es;q=0.9,en;q=0.8'.
// Falls back to DEFAULT_LANGUAGE for missing or unsupported values.
export function resolveLanguage(raw: unknown): SupportedLanguage {
  if (typeof raw !== 'string' || raw.trim() === '') return DEFAULT_LANGUAGE;
  const firstTag = raw.split(',')[0].trim().toLowerCase();
  const base = firstTag.split('-')[0].split(';')[0].trim();
  const match = (SUPPORTED_LANGUAGES as readonly string[]).includes(base)
    ? (base as SupportedLanguage)
    : DEFAULT_LANGUAGE;
  return match;
}
