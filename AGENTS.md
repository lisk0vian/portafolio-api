# AGENTS.md

NestJS 12 + Fastify 5 + TypeScript API. Single app, no DB. Node 22, pnpm 9+.

## Setup & run

```bash
cp .env.example .env   # PORT, NODE_ENV, LOG_LEVEL
pnpm install
pnpm run start:dev     # watch, http://localhost:3000/api
```

- Swagger: `http://localhost:3000/docs`; health: `GET /api/health`
- Prod: `pnpm run build` (`nest build`) then `node dist/main` (`start:prod`)

## Quality gates (CI order)

CI (`.github/workflows/ci.yml`): `lint` -> `test` -> `test:e2e` -> `build`, on Node 22 with `pnpm install --frozen-lockfile`. Run in the same order locally.

```bash
pnpm run lint      # oxlint --type-aware src/ test/
pnpm run test      # vitest run, **/*.spec.ts
pnpm run test:e2e  # vitest run --config ./vitest.config.e2e.ts, **/*.e2e-spec.ts
pnpm run build
```

Single test: `pnpm vitest run src/modules/<name>/<name>.service.spec.ts`
Single e2e: `pnpm vitest run --config ./vitest.config.e2e.ts test/app.e2e-spec.ts -t "<test name>"`
Format: `pnpm run format` (prettier `singleQuote`, `trailingComma: all`).

## Architecture

- Entry: `src/main.ts` — `FastifyAdapter`, global prefix `api`, CUSTOM header versioning with default fallback, global `ValidationPipe` (`whitelist`, `forbidNonWhitelisted`, `transform`, implicit conversion), `helmet` + `compress`, pino logger, Swagger at `/docs`.
- Wiring: `src/app.module.ts` — global `ConfigModule`, `nestjs-pino` (pretty only in non-production, level from `LOG_LEVEL`), global `ThrottlerGuard` (60 req/min), one module per resource: `health profile projects experience skills education certifications case-studies`.
- Module pattern: `src/modules/<resource>/{*.controller.ts,*.service.ts,*.module.ts,*.dto.ts}`. Services are stateless filters over static data — no repositories or migrations.

## Content, language, versioning

- Content lives in `src/data/<resource>/*.ts` (one bilingual file per entry, built with the `LocalizedFactory` subclasses in `src/data/_factories/` and aggregated by `src/data/<resource>/index.ts`), each typed via its DTO. Edit data files, not services, for text changes.
- Always update **both** locales together. `src/data/locales.parity.spec.ts` fails on mismatched slugs/keys/counts.
- URLs never contain language or version. Language: `x-lang` override wins over `Accept-Language` (`src/common/language/`; `resolveLanguage` accepts `es-ES`-style tags, falls back to `en`). Version: `x-api-version` header with fallback to `'1'` (`src/common/versioning/`; controllers declare no `@Version`, they rely on `defaultVersion`).
- New endpoints: inject language via `@Language() lang: SupportedLanguage` and annotate with `@ApiLanguageHeader()` + `@ApiVersionHeader()`. Slugs and query params stay identical across languages.

## Gotchas

- `module/moduleResolution: nodenext` — relative imports **must** keep the `.js` suffix (e.g. `./app.module.js`), even for `.ts` files.
- `ValidationPipe.forbidNonWhitelisted` is global: every accepted query param must be declared on the Query DTO or the request 400s. `test/app.e2e-spec.ts` boots `AppModule` in-memory via `app.inject` (no server listen, no external services).
- Sparse `fields=` responses (e.g. certifications, case-studies) use a per-service allowlist and always include `slug`; unknown fields throw `BadRequestException` (400), missing slugs throw `NotFoundException` (404).
- `oxlint` has `no-floating-promises: error` — `await` all promises; `no-explicit-any` is off.
- `tsconfig.build.json` excludes `test/` and `**/*spec.ts` — keep e2e fixtures in `test/`, unit specs next to source.
