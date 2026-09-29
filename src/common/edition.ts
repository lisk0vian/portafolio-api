// Portfolio editions (ficha 005): Ingenieria (fullstack) / Datos (data).
// Same keys the web uses. Items with `editions` only appear in those
// editions; items without `editions` appear in both.
export const EDITIONS = ['fullstack', 'data'] as const;

export type Edition = (typeof EDITIONS)[number];
