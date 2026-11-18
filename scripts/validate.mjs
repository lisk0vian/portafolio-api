// Valida el repo de datos: JSON parseable, paridad es/en y enlaces entre casos.
// Uso: node scripts/validate.mjs   (sin dependencias)
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const errors = [];
const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.json') ? [p] : [];
  });

const files = {};
for (const lang of ['es', 'en']) {
  files[lang] = new Map();
  for (const p of walk(join(root, lang))) {
    try {
      files[lang].set(relative(join(root, lang), p).replaceAll('\\', '/'), JSON.parse(readFileSync(p, 'utf8')));
    } catch (e) {
      errors.push(`${relative(root, p)}: ${e.message}`);
    }
  }
}

for (const [a, b] of [['es', 'en'], ['en', 'es']])
  for (const f of files[a].keys()) if (!files[b].has(f)) errors.push(`${a}/${f} no existe en ${b}/`);

for (const lang of ['es', 'en']) {
  const index = files[lang].get('case-studies/index.json') ?? [];
  const slugs = new Set(index.map((c) => c.slug));
  for (const s of slugs) if (!files[lang].has(`case-studies/${s}.json`)) errors.push(`${lang}: falta case-studies/${s}.json`);
  for (const s of slugs) {
    const next = files[lang].get(`case-studies/${s}.json`)?.nextCaseSlug;
    if (next && !slugs.has(next)) errors.push(`${lang}/${s}: nextCaseSlug "${next}" no existe`);
  }
  for (const p of files[lang].get('projects.json') ?? [])
    if (p.case && !slugs.has(p.case)) errors.push(`${lang}/projects ${p.slug}: case "${p.case}" no existe`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`ok: ${files.es.size} archivos por idioma`);
