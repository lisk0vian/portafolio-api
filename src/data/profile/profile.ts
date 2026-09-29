// Profile content. Only the timezone stays neutral.
import { ProfileFactory } from '../_factories/profile.factory.js';

const base = new ProfileFactory().timezone('America/Lima');

const en = base
  .locale('en')
  .name('Your Name')
  .role('Full-Stack Developer')
  .tagline('I build fast, maintainable APIs and web experiences')
  .bio(
    'Developer focused on TypeScript, NestJS and clean architectures. Edit this file with your real information.',
  )
  .location('Remote / Your City')
  .availability('Available for projects')
  .email('hello@yourdomain.com')
  .socials([
    {
      label: 'GitHub',
      url: 'https://github.com/your-user',
      handle: '@your-user',
      note: 'Open source, experiments and notebooks.',
    },
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/your-user',
      handle: 'your-user',
      note: 'Career history and recommendations.',
    },
    { label: 'X', url: 'https://x.com/your-user', handle: '@your-user' },
  ])
  .about([
    'I work across backend and frontend with a focus on APIs that stay fast under load.',
    'I write about applied research and ship reproducible experiments.',
  ])
  .notes([
    { title: 'Now', text: 'Open to freelance and research collaborations.' },
  ])
  .letter(
    'Write to me about APIs, research or tooling. I answer every serious email.',
  )
  .cvUrl('/cv-en.pdf')
  .quote(
    "The best code is the code you didn't have to write; the second best is code someone else understands at first read.",
  )
  .quoteSource('Personal note, 2025')
  .facts([
    { label: 'Based in', value: 'Lima, Peru' },
    { label: 'Timezone', value: 'UTC-5 · remote' },
    { label: 'Languages', value: 'Spanish, English' },
    { label: 'Experience', value: '6 years' },
  ])
  .principles([
    {
      title: 'Data model first',
      text: 'A correct schema removes more bugs than any validation layer.',
    },
    {
      title: 'Actually fast',
      text: 'I measure latency and page weight before optimizing what feels slow.',
    },
    {
      title: "Write for whoever's next",
      text: 'Docs, clear names and small PRs reviewable in ten minutes.',
    },
  ])
  .hoursNote('I overlap 9:00–14:00 with American and European hours.')
  .now({
    updatedAt: '2026-09',
    items: [
      { label: 'Building', value: 'A queue engine in Go' },
      { label: 'Learning', value: 'Rust and WebAssembly' },
      { label: 'Reading', value: 'Designing Data-Intensive Applications' },
    ],
  })
  .editions({
    fullstack: {
      role: 'Full-Stack Developer',
      headline: {
        before: 'I build web products',
        emphasis: 'end to end',
        after: '— APIs that stay fast under load.',
      },
      bio: 'Developer focused on TypeScript, NestJS and clean architectures. Edit this file with your real information.',
      about: [
        'I work across backend and frontend with a focus on APIs that stay fast under load.',
        'I write about applied research and ship reproducible experiments.',
      ],
      notes: [
        {
          title: 'Now',
          text: 'Open to freelance and research collaborations.',
        },
      ],
      letter:
        'Write to me about APIs, research or tooling. I answer every serious email.',
      quote:
        "The best code is the code you didn't have to write; the second best is code someone else understands at first read.",
      quoteSource: 'Personal note, 2025',
      principles: [
        {
          title: 'Data model first',
          text: 'A correct schema removes more bugs than any validation layer.',
        },
        {
          title: 'Actually fast',
          text: 'I measure latency and page weight before optimizing what feels slow.',
        },
        {
          title: "Write for whoever's next",
          text: 'Docs, clear names and small PRs reviewable in ten minutes.',
        },
      ],
      now: {
        updatedAt: '2026-09',
        items: [
          { label: 'Building', value: 'A queue engine in Go' },
          { label: 'Learning', value: 'Rust and WebAssembly' },
          { label: 'Reading', value: 'Designing Data-Intensive Applications' },
        ],
      },
    },
    data: {
      role: 'Data Scientist',
      headline: {
        before: 'I turn messy data into',
        emphasis: 'decisions',
        after: '— models that ship to production.',
      },
      bio: 'Data scientist focused on Python, experimentation and ML systems that sales teams trust.',
      about: [
        'I work across data pipelines and modeling with a focus on calibrated probabilities.',
        'I explain every model with per-customer evidence, not black boxes.',
      ],
      notes: [
        {
          title: 'Now',
          text: 'Open to data science roles and experimentation consults.',
        },
      ],
      letter:
        'Write to me about churn, forecasting or experimentation. I answer every serious email.',
      quote:
        'A model nobody trusts is a report nobody reads; calibrate first, then explain.',
      quoteSource: 'Personal note, 2025',
      principles: [
        {
          title: 'Calibrate first',
          text: 'A probability is a promise; I validate out of sample before quoting it.',
        },
        {
          title: 'Explain per customer',
          text: 'SHAP values and reason codes turn scores into actions for sales.',
        },
        {
          title: 'Temporal validation',
          text: "No shuffling the future into the past; time splits or it didn't happen.",
        },
      ],
      now: {
        updatedAt: '2026-09',
        items: [
          {
            label: 'Building',
            value: 'A churn model with calibrated probabilities',
          },
          { label: 'Learning', value: 'Causal inference' },
          { label: 'Reading', value: 'Designing Machine Learning Systems' },
        ],
      },
    },
  });

const es = base
  .locale('es')
  .name('Tu Nombre')
  .role('Desarrollador Full-Stack')
  .tagline('Construyo APIs y experiencias web rápidas y mantenibles')
  .bio(
    'Desarrollador enfocado en TypeScript, NestJS y arquitecturas limpias. Edita este JSON con tu información real.',
  )
  .location('Remoto / Tu Ciudad')
  .availability('Disponible para proyectos')
  .email('chancanjeremiaron@gmail.com')
  .socials([
    {
      label: 'GitHub',
      url: 'https://github.com/tu-usuario',
      handle: '@tu-usuario',
      note: 'Código abierto, experimentos y notebooks.',
    },
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/tu-usuario',
      handle: 'tu-usuario',
      note: 'Trayectoria y recomendaciones.',
    },
    { label: 'X', url: 'https://x.com/tu-usuario', handle: '@tu-usuario' },
  ])
  .about([
    'Trabajo entre backend y frontend con foco en APIs que se mantienen rápidas bajo carga.',
    'Escribo sobre investigación aplicada y publico experimentos reproducibles.',
  ])
  .notes([
    {
      title: 'Ahora',
      text: 'Abierto a freelance y colaboraciones de investigación.',
    },
  ])
  .letter(
    'Escríbeme sobre APIs, investigación o tooling. Respondo cada correo serio.',
  )
  .cvUrl('/cv-es.pdf')
  .quote(
    'El mejor código es el que no tuviste que escribir; el segundo mejor, el que otro entiende a la primera.',
  )
  .quoteSource('Nota personal, 2025')
  .facts([
    { label: 'Base', value: 'Lima, Perú' },
    { label: 'Zona', value: 'UTC-5 · remoto' },
    { label: 'Idiomas', value: 'Español, inglés' },
    { label: 'Experiencia', value: '6 años' },
  ])
  .principles([
    {
      title: 'Primero el modelo de datos',
      text: 'Un esquema correcto elimina más errores que cualquier capa de validación.',
    },
    {
      title: 'Rápido de verdad',
      text: 'Mido latencia y peso de página antes de optimizar lo que se siente lento.',
    },
    {
      title: 'Escribir para quien viene',
      text: 'Documentación, nombres claros y PRs pequeños que se revisan en diez minutos.',
    },
  ])
  .hoursNote('Coincido de 9:00 a 14:00 con horarios de América y Europa.')
  .now({
    updatedAt: '2026-09',
    items: [
      { label: 'Construyendo', value: 'Un motor de colas en Go' },
      { label: 'Aprendiendo', value: 'Rust y WebAssembly' },
      { label: 'Leyendo', value: 'Designing Data-Intensive Applications' },
    ],
  })
  .editions({
    fullstack: {
      role: 'Desarrollador Full-Stack',
      headline: {
        before: 'Construyo productos web',
        emphasis: 'de punta a punta',
        after: '— APIs que se mantienen rápidas bajo carga.',
      },
      bio: 'Desarrollador enfocado en TypeScript, NestJS y arquitecturas limpias. Edita este JSON con tu información real.',
      about: [
        'Trabajo entre backend y frontend con foco en APIs que se mantienen rápidas bajo carga.',
        'Escribo sobre investigación aplicada y publico experimentos reproducibles.',
      ],
      notes: [
        {
          title: 'Ahora',
          text: 'Abierto a freelance y colaboraciones de investigación.',
        },
      ],
      letter:
        'Escríbeme sobre APIs, investigación o tooling. Respondo cada correo serio.',
      quote:
        'El mejor código es el que no tuviste que escribir; el segundo mejor, el que otro entiende a la primera.',
      quoteSource: 'Nota personal, 2025',
      principles: [
        {
          title: 'Primero el modelo de datos',
          text: 'Un esquema correcto elimina más errores que cualquier capa de validación.',
        },
        {
          title: 'Rápido de verdad',
          text: 'Mido latencia y peso de página antes de optimizar lo que se siente lento.',
        },
        {
          title: 'Escribir para quien viene',
          text: 'Documentación, nombres claros y PRs pequeños que se revisan en diez minutos.',
        },
      ],
      now: {
        updatedAt: '2026-09',
        items: [
          { label: 'Construyendo', value: 'Un motor de colas en Go' },
          { label: 'Aprendiendo', value: 'Rust y WebAssembly' },
          { label: 'Leyendo', value: 'Designing Data-Intensive Applications' },
        ],
      },
    },
    data: {
      role: 'Científico de datos',
      headline: {
        before: 'Convierto datos desordenados en',
        emphasis: 'decisiones',
        after: '— modelos que llegan a producción.',
      },
      bio: 'Científico de datos enfocado en Python, experimentación y sistemas de ML en los que confían los equipos comerciales.',
      about: [
        'Trabajo entre pipelines de datos y modelado con foco en probabilidades calibradas.',
        'Explico cada modelo con evidencia por cliente, no con cajas negras.',
      ],
      notes: [
        {
          title: 'Ahora',
          text: 'Abierto a roles de ciencia de datos y consultorías de experimentación.',
        },
      ],
      letter:
        'Escríbeme sobre churn, pronóstico o experimentación. Respondo cada correo serio.',
      quote:
        'Un modelo en el que nadie confía es un informe que nadie lee; primero calibrar, luego explicar.',
      quoteSource: 'Nota personal, 2025',
      principles: [
        {
          title: 'Calibrar primero',
          text: 'Una probabilidad es una promesa; valido fuera de muestra antes de citarla.',
        },
        {
          title: 'Explicar por cliente',
          text: 'Valores SHAP y códigos de motivo convierten puntajes en acciones para ventas.',
        },
        {
          title: 'Validación temporal',
          text: 'Sin mezclar el futuro con el pasado; cortes por tiempo o no cuenta.',
        },
      ],
      now: {
        updatedAt: '2026-09',
        items: [
          {
            label: 'Construyendo',
            value: 'Un modelo de churn con probabilidades calibradas',
          },
          { label: 'Aprendiendo', value: 'Inferencia causal' },
          { label: 'Leyendo', value: 'Designing Machine Learning Systems' },
        ],
      },
    },
  });

export default base.assemble(en, es);
