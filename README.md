# Portfolio API

Public read-only API for the portfolio. NestJS + Fastify + TypeScript.

## Requirements

- Node 20+ (22 recommended)
- pnpm 9+

## Local development

```bash
cp .env.example .env
pnpm install
pnpm run start:dev
```

- API: `http://localhost:3000/api`
- Swagger: `http://localhost:3000/docs`
- Health: `GET /api/health`

## Language negotiation (headers, stable URLs)

Endpoints never change with the language. Send one of these headers:

```bash
# Spanish via standard header
curl -H "Accept-Language: es" http://localhost:3000/api/profile

# Spanish via explicit override (wins over Accept-Language)
curl -H "x-lang: es" http://localhost:3000/api/profile

# Default (no header) is English
curl http://localhost:3000/api/profile
```

Supported values: `en`, `es` (including tags like `es-ES`, `en-US`).
Unsupported or missing values fall back to `en`.

## Version negotiation (headers, stable URLs)

The version is also sent via header, so URLs never include it:

```bash
# Default version (no header needed)
curl http://localhost:3000/api/profile

# Explicit version
curl -H "x-api-version: 1" http://localhost:3000/api/profile
```

Supported versions: `1`. Missing values fall back to the default.

## Endpoints (read-only)

- `GET /api/profile`
- `GET /api/projects?featured=true&stack=nest&limit=20`
- `GET /api/projects/:slug`
- `GET /api/experience`
- `GET /api/skills`
- `GET /api/education`
- `GET /api/certifications?tag=aws&skill=docker&featured=true&expired=false&fields=slug,title&limit=20`
- `GET /api/certifications/:slug?fields=slug,title,issuer`
- `GET /api/case-studies?projectSlug=&tag=&search=&fields=&limit=`
- `GET /api/case-studies/:slug?fields=slug,title,sections`

Slugs and query params are identical in every language and version;
only the localized text changes.

Edit the content in `src/data/<resource>/*.ts` (one bilingual file per entry,
built with the factories in `src/data/_factories/`).
Each entry is validated by its factory at startup,
and `locales.parity.spec.ts` ensures both languages expose the same entries.

## Quality gates

```bash
pnpm run lint
pnpm run test
pnpm run test:e2e
pnpm run build
```

Includes: Fastify + helmet/compress/cors, global validation,
header versioning, Pino logs, 60 req/min rate limit, Swagger,
and CI in `.github/workflows/ci.yml`.
