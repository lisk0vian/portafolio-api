import type { ProfileDto } from '../../modules/profile/profile.dto.js';

// Static content for the profile section (en).
const profile = {
  "name": "Your Name",
  "role": "Full-Stack Developer",
  "tagline": "I build fast, maintainable APIs and web experiences",
  "bio": "Developer focused on TypeScript, NestJS and clean architectures. Edit this file with your real information.",
  "location": "Remote / Your City",
  "availability": "Available for projects",
  "email": "hello@yourdomain.com",
  "socials": [
    {
      "label": "GitHub",
      "url": "https://github.com/your-user",
      "handle": "@your-user",
      "note": "Open source, experiments and notebooks."
    },
    {
      "label": "LinkedIn",
      "url": "https://linkedin.com/in/your-user",
      "handle": "your-user",
      "note": "Career history and recommendations."
    },
    {
      "label": "X",
      "url": "https://x.com/your-user",
      "handle": "@your-user"
    }
  ],
  "about": [
    "I work across backend and frontend with a focus on APIs that stay fast under load.",
    "I write about applied research and ship reproducible experiments."
  ],
  "notes": [
    {
      "title": "Now",
      "text": "Open to freelance and research collaborations."
    }
  ],
  "letter": "Write to me about APIs, research or tooling. I answer every serious email.",
  "cvUrl": "/cv-en.pdf",
  "quote": "The best code is the code you didn't have to write; the second best is code someone else understands at first read.",
  "quoteSource": "Personal note, 2025",
  "facts": [
    { "label": "Based in", "value": "Lima, Peru" },
    { "label": "Timezone", "value": "UTC-5 · remote" },
    { "label": "Languages", "value": "Spanish, English" },
    { "label": "Experience", "value": "6 years" }
  ],
  "principles": [
    { "title": "Data model first", "text": "A correct schema removes more bugs than any validation layer." },
    { "title": "Actually fast", "text": "I measure latency and page weight before optimizing what feels slow." },
    { "title": "Write for whoever's next", "text": "Docs, clear names and small PRs reviewable in ten minutes." }
  ],
  "timezone": "America/Lima",
  "hoursNote": "I overlap 9:00–14:00 with American and European hours.",
  "now": {
    "updatedAt": "2026-09",
    "items": [
      { "label": "Building", "value": "A queue engine in Go" },
      { "label": "Learning", "value": "Rust and WebAssembly" },
      { "label": "Reading", "value": "Designing Data-Intensive Applications" }
    ]
  },
  "editions": {
    "fullstack": {
      "role": "Full-Stack Developer",
      "headline": { "before": "I build web products", "emphasis": "end to end", "after": "— APIs that stay fast under load." },
      "bio": "Developer focused on TypeScript, NestJS and clean architectures. Edit this file with your real information.",
      "about": [
        "I work across backend and frontend with a focus on APIs that stay fast under load.",
        "I write about applied research and ship reproducible experiments."
      ],
      "notes": [
        {
          "title": "Now",
          "text": "Open to freelance and research collaborations."
        }
      ],
      "letter": "Write to me about APIs, research or tooling. I answer every serious email.",
      "quote": "The best code is the code you didn't have to write; the second best is code someone else understands at first read.",
      "quoteSource": "Personal note, 2025",
      "principles": [
        { "title": "Data model first", "text": "A correct schema removes more bugs than any validation layer." },
        { "title": "Actually fast", "text": "I measure latency and page weight before optimizing what feels slow." },
        { "title": "Write for whoever's next", "text": "Docs, clear names and small PRs reviewable in ten minutes." }
      ],
      "now": {
        "updatedAt": "2026-09",
        "items": [
          { "label": "Building", "value": "A queue engine in Go" },
          { "label": "Learning", "value": "Rust and WebAssembly" },
          { "label": "Reading", "value": "Designing Data-Intensive Applications" }
        ]
      }
    },
    "data": {
      "role": "Data Scientist",
      "headline": { "before": "I turn messy data into", "emphasis": "decisions", "after": "— models that ship to production." },
      "bio": "Data scientist focused on Python, experimentation and ML systems that sales teams trust.",
      "about": [
        "I work across data pipelines and modeling with a focus on calibrated probabilities.",
        "I explain every model with per-customer evidence, not black boxes."
      ],
      "notes": [
        {
          "title": "Now",
          "text": "Open to data science roles and experimentation consults."
        }
      ],
      "letter": "Write to me about churn, forecasting or experimentation. I answer every serious email.",
      "quote": "A model nobody trusts is a report nobody reads; calibrate first, then explain.",
      "quoteSource": "Personal note, 2025",
      "principles": [
        { "title": "Calibrate first", "text": "A probability is a promise; I validate out of sample before quoting it." },
        { "title": "Explain per customer", "text": "SHAP values and reason codes turn scores into actions for sales." },
        { "title": "Temporal validation", "text": "No shuffling the future into the past; time splits or it didn't happen." }
      ],
      "now": {
        "updatedAt": "2026-09",
        "items": [
          { "label": "Building", "value": "A churn model with calibrated probabilities" },
          { "label": "Learning", "value": "Causal inference" },
          { "label": "Reading", "value": "Designing Machine Learning Systems" }
        ]
      }
    }
  }
} satisfies ProfileDto;

export default profile;
