# portafolio-api

Datos del portafolio de Jerremi Aron Chancan Labajos ([lisk0vian](https://github.com/lisk0vian)): JSON por idioma y PDFs. No hay servidor: el sitio los lee directamente desde `raw.githubusercontent.com`.

```
https://raw.githubusercontent.com/lisk0vian/portafolio-api/main/{es|en}/{recurso}.json
```

## Estructura

```
es/ · en/                    mismos archivos en cada idioma
├── profile.json             perfil, redes, "sobre mí", principios, ediciones (fullstack | data)
├── projects.json            proyectos; `case` apunta a un caso de estudio
├── experience.json          experiencia laboral
├── skills.json              grupos de skills (años, uso diario)
├── certifications.json      certificaciones; `tags` define los grupos de /certificaciones
├── publications.json        publicaciones con DOI
├── education.json           formación
└── case-studies/
    ├── index.json           lista de casos (slug, título, resumen)
    └── <slug>.json          caso completo por bloques
files/
├── cv/                      cv-es.pdf · cv-en.pdf
├── certifications/          PDFs de certificados (<slug>.pdf)
└── cases/<slug>/            capturas de los casos de estudio
scripts/validate.mjs         valida JSON, paridad es/en y enlaces entre casos
```

## Casos de estudio

Un caso es una lista de `sections`, cada una con `blocks`:

| `type` | Campos |
|---|---|
| `paragraph` | `text` (admite `**negrita**`, `*cursiva*` y `` `código` ``) |
| `list` | `items[]` |
| `code` | `lang`, `code`, `caption`, `source` (URL al archivo original) |
| `diagram` | `format: "mermaid"`, `source`, `caption` |
| `table` | `head[]`, `rows[][]`, `caption` |
| `metrics` | `items[]` con `value` y `label` |
| `image` | `src` (URL de `files/cases/<slug>/`), `alt`, `caption` |
| `demo` | `url` de una demo en vivo (se embebe), `caption` |

Los diagramas son texto Mermaid: GitHub los muestra igual que el sitio.

## Editar

1. Cambia el JSON en `es/` **y** en `en/`.
2. `node scripts/validate.mjs` (también corre en CI).
3. Commit y push: el sitio toma los cambios en la siguiente visita; las páginas de casos nuevos aparecen tras el despliegue diario del sitio.
