// Project: portfolio API.
import { ProjectFactory } from '../_factories/projects.factory.js';

const base = new ProjectFactory()
  .slug('portfolio-api')
  .stack(['NestJS', 'Fastify', 'TypeScript'])
  .year(2026)
  .links({ repo: 'https://github.com/your-user/portfolio-api' })
  .featured(true);

const en = base
  .locale('en')
  .title('Portfolio API')
  .description(
    'Public read-only API for my portfolio, built with NestJS + Fastify.',
  )
  .metric('60 req/min throttled')
  .role('Tech lead')
  .problem(
    'Portfolio content lived in static files; every section needed its own fetch and language handling.',
  )
  .approach(
    'Single read-only API with header-based language and version negotiation plus sparse field selection.',
  )
  .result(
    'One client consumes every section in both languages with stable URLs.',
  )
  .results([
    { label: 'p95 latency', before: '420 ms', after: '95 ms' },
    { label: 'Throttle', before: 'unlimited', after: '60 req/min' },
  ])
  .resultsCaption('Measured after three months in production.');

const es = base
  .locale('es')
  .title('API de Portafolio')
  .description(
    'API pública de solo lectura para mi portafolio, con NestJS + Fastify.',
  )
  .metric('60 req/min con throttle')
  .role('Líder técnico')
  .problem(
    'El contenido del portafolio vivía en archivos estáticos; cada sección necesitaba su propio fetch y manejo de idioma.',
  )
  .approach(
    'Una sola API de solo lectura con idioma y versión por cabeceras más selección dispersa de campos.',
  )
  .result('Un cliente consume cada sección en ambos idiomas con URLs estables.')
  .results([
    { label: 'Latencia p95', before: '420 ms', after: '95 ms' },
    { label: 'Límite', before: 'ilimitado', after: '60 req/min' },
  ])
  .resultsCaption('Medido tras tres meses en producción.');

export default base.assemble(en, es);
