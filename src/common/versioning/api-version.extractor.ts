import {
  API_VERSION_HEADER,
  DEFAULT_API_VERSION,
  SUPPORTED_API_VERSIONS,
  type SupportedApiVersion,
} from './api-version.const.js';

// Extracts the API version from the version header for CUSTOM versioning.
// Missing or unsupported values fall back to the default so URLs stay stable.
export function apiVersionExtractor(request: unknown): SupportedApiVersion {
  const headers =
    typeof request === 'object' && request !== null && 'headers' in request
      ? (request as { headers?: Record<string, unknown> }).headers
      : undefined;
  const raw = headers?.[API_VERSION_HEADER];
  const value = Array.isArray(raw) ? raw[0] : raw;
  const normalized = typeof value === 'string' ? value.trim() : '';
  return (SUPPORTED_API_VERSIONS as readonly string[]).includes(normalized)
    ? (normalized as SupportedApiVersion)
    : DEFAULT_API_VERSION;
}
