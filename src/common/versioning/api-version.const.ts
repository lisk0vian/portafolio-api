export const API_VERSION_HEADER = 'x-api-version';

export const SUPPORTED_API_VERSIONS = ['1'] as const;

export type SupportedApiVersion = (typeof SUPPORTED_API_VERSIONS)[number];

export const DEFAULT_API_VERSION: SupportedApiVersion = '1';
