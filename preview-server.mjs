import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const envFile = path.join(root, '.env.development.local')
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['\"]|['\"]$/g, '')
  }
}
const configs = {
  news: ['apiKey', 'mh-news-1bd1d', 'mh-news-1bd1d.firebaseapp.com', '428595106543', '1:428595106543:web:8e5e1d05bd13e03da0011a'],
  gallery: ['apiKey_2', 'mh-gallery', 'mh-gallery.firebaseapp.com', '650364941929', '1:650364941929:web:4f6658289ce51697f154f8'],
  officers: ['apiKey_3', 'mh-officers', 'mh-officers.firebaseapp.com', '293297506377', '1:293297506377:web:a6ccc5b7f8415a99281798'],
  documents: ['apiKey_4', 'mh-docements', 'mh-docements.firebaseapp.com', '596950065396', '1:596950065396:web:fa88a0f11ae219483afea1'],
  membership: ['apiKey_5', 'mh-membership', 'mh-membership.firebaseapp.com', '1089435996808', '1:1089435996808:web:f962d3037c490ad6a2053d'],
  website: ['apiKey_6', 'mh-website-content', 'mh-website-content.firebaseapp.com', '425484772184', '1:425484772184:web:2b695db75232fd35063b2d']
}
const firebaseConfig = Object.fromEntries(Object.entries(configs).map(([name, [key, projectId, authDomain, messagingSenderId, appId]]) => [name, { apiKey: process.env[key] || '', authDomain, projectId, storageBucket: `${projectId}.firebasestorage.app`, messagingSenderId, appId }]))
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json' }
http.createServer((req, res) => {
  if (req.url === '/api/firebase-config') { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(firebaseConfig)); return }
  const requested = decodeURIComponent((req.url || '/').split('?')[0])
  const file = path.join(root, requested === '/' ? 'index.html' : requested.slice(1))
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.statusCode = 404; res.end('Not found'); return }
  res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream'); fs.createReadStream(file).pipe(res)
}).listen(3000)
