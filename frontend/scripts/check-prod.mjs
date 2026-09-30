import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { loadEnv } from 'vite'
import { siteData } from '../src/data/siteData.js'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')
const env = loadEnv('production', root, 'VITE_')
const siteUrl = (process.env.VITE_SITE_URL || env.VITE_SITE_URL || siteData.siteUrl).replace(/\/+$/, '')

for (const filename of ['index.html', 'sitemap.xml', 'robots.txt']) {
  try {
    await readFile(resolve(dist, filename))
  } catch {
    throw new Error(`Production check failed: dist/${filename} is missing. Run npm run build first.`)
  }
}

const sitemap = await readFile(resolve(dist, 'sitemap.xml'), 'utf8')
if (!sitemap.includes(`<loc>${siteUrl}/`)) {
  throw new Error(`Production check failed: sitemap URLs must use VITE_SITE_URL (${siteUrl}).`)
}
if (/https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?/i.test(sitemap)) {
  throw new Error('Production check failed: sitemap contains a localhost URL.')
}

process.stdout.write('Production checks passed: build files exist and sitemap uses the configured site URL.\n')
