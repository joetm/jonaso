import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

// ---------------------------------------------------------------------------
// Dev-only static serving
//
// In production, ./public is the deploy root, so committed files (artwork
// images, PDFs, generated JSON) are simply there. In dev, publicDir is
// ./static, so serve ./public as a fallback. Also resolves extensionless
// directory URLs in ./static (e.g. /research/ontology -> index.html), which
// the old gatsby-node.js dev middleware did.
// ---------------------------------------------------------------------------
const MIME = {
  '.html': 'text/html', '.json': 'application/json', '.js': 'text/javascript',
  '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif',
  '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.txt': 'text/plain',
  '.mp3': 'audio/mpeg', '.bib': 'text/plain',
}

function servePublicInDev() {
  return {
    name: 'serve-public-in-dev',
    hooks: {
      'astro:server:setup': ({ server }) => {
        server.middlewares.use((req, res, next) => {
          const urlPath = decodeURIComponent((req.url || '').split('?')[0])
          if (!urlPath.startsWith('/') || urlPath.includes('..')) return next()
          const candidates = [
            path.join(root, 'public', urlPath),
            path.join(root, 'static', urlPath, 'index.html'),
          ]
          for (const file of candidates) {
            if (fs.existsSync(file) && fs.statSync(file).isFile()) {
              res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream')
              fs.createReadStream(file).pipe(res)
              return
            }
          }
          next()
        })
      },
    },
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.jonaso.de',
  outDir: './public',
  publicDir: './static',
  build: {
    format: 'directory',
  },
  integrations: [react(), servePublicInDev()],
  vite: {
    optimizeDeps: {
      // the dep scanner crawls src/pages/_gatsby-legacy/** too; keep it from
      // following `import "gatsby"` into gatsby's unparseable cache-dir
      exclude: ['gatsby'],
    },
    server: {
      watch: {
        // The repo carries ~125k data/output files (reading_list alone has
        // ~98k) — far beyond the inotify watcher limit. None of these are
        // source code; JSON imported from them at build time just won't
        // hot-reload (restart dev to pick up regenerated data).
        ignored: [
          '**/reading_list/**',
          '**/public/**',
          '**/artworks/**',
          '**/oracle/**',
          '**/stat_aggregator/**',
          '**/nexus/**',
          '**/libs/**',
          '**/dist-newstyle/**',
          '**/ENV/**',
          '**/.data-snapshot/**',
          '**/bin/**',
        ],
      },
    },
  },
})
