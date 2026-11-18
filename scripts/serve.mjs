// Sirve este repo con CORS para probar el sitio contra datos locales:
//   node scripts/serve.mjs [puerto]   →   PUBLIC_DATA_URL=http://localhost:8787
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const port = Number(process.argv[2] ?? 8787);
const types = { '.json': 'application/json; charset=utf-8', '.pdf': 'application/pdf' };

createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^([/\\])+/, '');
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (path.startsWith('..')) return res.writeHead(403).end();
  try {
    const body = await readFile(join(root, path));
    res.writeHead(200, { 'Content-Type': types[extname(path)] ?? 'application/octet-stream' }).end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
}).listen(port, () => console.log(`datos en http://localhost:${port}`));
