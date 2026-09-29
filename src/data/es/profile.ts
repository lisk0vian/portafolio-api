import type { ProfileDto } from '../../modules/profile/profile.dto.js';

// Static content for the profile section (es).
const profile = {
  "name": "Tu Nombre",
  "role": "Desarrollador Full-Stack",
  "tagline": "Construyo APIs y experiencias web rápidas y mantenibles",
  "bio": "Desarrollador enfocado en TypeScript, NestJS y arquitecturas limpias. Edita este JSON con tu información real.",
  "location": "Remoto / Tu Ciudad",
  "availability": "Disponible para proyectos",
  "email": "chancanjeremiaron@gmail.com",
  "socials": [
    {
      "label": "GitHub",
      "url": "https://github.com/tu-usuario",
      "handle": "@tu-usuario",
      "note": "Código abierto, experimentos y notebooks."
    },
    {
      "label": "LinkedIn",
      "url": "https://linkedin.com/in/tu-usuario",
      "handle": "tu-usuario",
      "note": "Trayectoria y recomendaciones."
    },
    {
      "label": "X",
      "url": "https://x.com/tu-usuario",
      "handle": "@tu-usuario"
    }
  ],
  "about": [
    "Trabajo entre backend y frontend con foco en APIs que se mantienen rápidas bajo carga.",
    "Escribo sobre investigación aplicada y publico experimentos reproducibles."
  ],
  "notes": [
    {
      "title": "Ahora",
      "text": "Abierto a freelance y colaboraciones de investigación."
    }
  ],
  "letter": "Escríbeme sobre APIs, investigación o tooling. Respondo cada correo serio.",
  "cvUrl": "/cv-es.pdf",
  "quote": "El mejor código es el que no tuviste que escribir; el segundo mejor, el que otro entiende a la primera.",
  "quoteSource": "Nota personal, 2025",
  "facts": [
    { "label": "Base", "value": "Lima, Perú" },
    { "label": "Zona", "value": "UTC-5 · remoto" },
    { "label": "Idiomas", "value": "Español, inglés" },
    { "label": "Experiencia", "value": "6 años" }
  ],
  "principles": [
    { "title": "Primero el modelo de datos", "text": "Un esquema correcto elimina más errores que cualquier capa de validación." },
    { "title": "Rápido de verdad", "text": "Mido latencia y peso de página antes de optimizar lo que se siente lento." },
    { "title": "Escribir para quien viene", "text": "Documentación, nombres claros y PRs pequeños que se revisan en diez minutos." }
  ],
  "timezone": "America/Lima",
  "hoursNote": "Coincido de 9:00 a 14:00 con horarios de América y Europa.",
  "now": {
    "updatedAt": "2026-09",
    "items": [
      { "label": "Construyendo", "value": "Un motor de colas en Go" },
      { "label": "Aprendiendo", "value": "Rust y WebAssembly" },
      { "label": "Leyendo", "value": "Designing Data-Intensive Applications" }
    ]
  },
  "editions": {
    "fullstack": {
      "role": "Desarrollador Full-Stack",
      "headline": { "before": "Construyo productos web", "emphasis": "de punta a punta", "after": "— APIs que se mantienen rápidas bajo carga." },
      "bio": "Desarrollador enfocado en TypeScript, NestJS y arquitecturas limpias. Edita este JSON con tu información real.",
      "about": [
        "Trabajo entre backend y frontend con foco en APIs que se mantienen rápidas bajo carga.",
        "Escribo sobre investigación aplicada y publico experimentos reproducibles."
      ],
      "notes": [
        {
          "title": "Ahora",
          "text": "Abierto a freelance y colaboraciones de investigación."
        }
      ],
      "letter": "Escríbeme sobre APIs, investigación o tooling. Respondo cada correo serio.",
      "quote": "El mejor código es el que no tuviste que escribir; el segundo mejor, el que otro entiende a la primera.",
      "quoteSource": "Nota personal, 2025",
      "principles": [
        { "title": "Primero el modelo de datos", "text": "Un esquema correcto elimina más errores que cualquier capa de validación." },
        { "title": "Rápido de verdad", "text": "Mido latencia y peso de página antes de optimizar lo que se siente lento." },
        { "title": "Escribir para quien viene", "text": "Documentación, nombres claros y PRs pequeños que se revisan en diez minutos." }
      ],
      "now": {
        "updatedAt": "2026-09",
        "items": [
          { "label": "Construyendo", "value": "Un motor de colas en Go" },
          { "label": "Aprendiendo", "value": "Rust y WebAssembly" },
          { "label": "Leyendo", "value": "Designing Data-Intensive Applications" }
        ]
      }
    },
    "data": {
      "role": "Científico de datos",
      "headline": { "before": "Convierto datos desordenados en", "emphasis": "decisiones", "after": "— modelos que llegan a producción." },
      "bio": "Científico de datos enfocado en Python, experimentación y sistemas de ML en los que confían los equipos comerciales.",
      "about": [
        "Trabajo entre pipelines de datos y modelado con foco en probabilidades calibradas.",
        "Explico cada modelo con evidencia por cliente, no con cajas negras."
      ],
      "notes": [
        {
          "title": "Ahora",
          "text": "Abierto a roles de ciencia de datos y consultorías de experimentación."
        }
      ],
      "letter": "Escríbeme sobre churn, pronóstico o experimentación. Respondo cada correo serio.",
      "quote": "Un modelo en el que nadie confía es un informe que nadie lee; primero calibrar, luego explicar.",
      "quoteSource": "Nota personal, 2025",
      "principles": [
        { "title": "Calibrar primero", "text": "Una probabilidad es una promesa; valido fuera de muestra antes de citarla." },
        { "title": "Explicar por cliente", "text": "Valores SHAP y códigos de motivo convierten puntajes en acciones para ventas." },
        { "title": "Validación temporal", "text": "Sin mezclar el futuro con el pasado; cortes por tiempo o no cuenta." }
      ],
      "now": {
        "updatedAt": "2026-09",
        "items": [
          { "label": "Construyendo", "value": "Un modelo de churn con probabilidades calibradas" },
          { "label": "Aprendiendo", "value": "Inferencia causal" },
          { "label": "Leyendo", "value": "Designing Machine Learning Systems" }
        ]
      }
    }
  }
} satisfies ProfileDto;

export default profile;
