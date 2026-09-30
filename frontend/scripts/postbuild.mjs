import { access, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { constants } from 'node:fs'
import { spawn } from 'node:child_process'
import { setTimeout as delay } from 'node:timers/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'
import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'
import { loadEnv } from 'vite'
import blogPosts from '../src/data/blogPosts.js'
import { siteData } from '../src/data/siteData.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const buildEnv = loadEnv('production', root, 'VITE_')
const siteUrl = (process.env.VITE_SITE_URL || buildEnv.VITE_SITE_URL || siteData.siteUrl).replace(/\/+$/, '')
const port = Number(process.env.PRERENDER_PORT || 4178)
const origin = `http://127.0.0.1:${port}`
const viteCli = join(root, 'node_modules', 'vite', 'bin', 'vite.js')
const routes = [
  '/',
  '/course',
  '/pricing',
  '/instructor',
  '/demo',
  '/admission',
  '/thank-you',
  '/blog',
  ...blogPosts.map((post) => `/blog/${post.slug}`),
]

function logProgress(message) {
  process.stdout.write(`[postbuild] ${new Date().toISOString()} ${message}\n`)
}

async function getBrowserExecutablePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH
  if (process.platform === 'linux') return chromium.executablePath()

  const candidates = process.platform === 'win32'
    ? [
        join(process.env.PROGRAMFILES || 'C:\\Program Files', 'Google', 'Chrome', 'Application', 'chrome.exe'),
        join(process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)', 'Google', 'Chrome', 'Application', 'chrome.exe'),
        join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
        join(process.env.PROGRAMFILES || 'C:\\Program Files', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
      ]
    : ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']

  for (const candidate of candidates) {
    try {
      await access(candidate, constants.F_OK)
      return candidate
    } catch {
      continue
    }
  }

  throw new Error('No local Chrome browser found. Set PUPPETEER_EXECUTABLE_PATH to a Chrome executable.')
}

const criticalCss = `
*{box-sizing:border-box}
html{background:#080912}
body{min-width:320px;min-height:100vh;margin:0;overflow-x:hidden;background:#080912;color:#f4f5ff;font-family:Inter,Arial,sans-serif}
button,a{font-family:Inter,Arial,sans-serif}
a{color:inherit;text-decoration:none}
h1,h2,h3{font-family:Poppins,Inter,Arial,sans-serif}
.page-container{width:min(1160px,calc(100% - 64px));margin-inline:auto}
.site-main{position:relative;z-index:1}
.site-header{position:sticky;top:0;z-index:20;border-bottom:1px solid rgba(177,182,220,.09);background:rgba(8,9,18,.92)}
.navbar{min-height:78px;display:flex;align-items:center;justify-content:space-between;gap:26px}
.brand{flex-shrink:0;color:#fff;font-family:Poppins,Inter,sans-serif;font-size:25px;font-weight:800;letter-spacing:-1.4px}
.brand span{color:#c084fc}
.nav-links{display:flex;align-items:center;gap:25px}
.nav-links a{position:relative;color:#b8b8ca;font-size:11px;font-weight:500}
.nav-cta{min-height:40px;padding-inline:15px;font-size:11px}
.menu-toggle,.mobile-menu{display:none}
.button{display:inline-flex;min-height:48px;align-items:center;justify-content:center;gap:9px;padding:0 20px;border:1px solid transparent;border-radius:9px;color:#fff;font-size:13px;font-weight:600}
.button--primary{background:linear-gradient(108deg,#8548e7,#5967e8 58%,#39b8d9)}
.button--outline{border-color:rgba(175,177,214,.23);background:rgba(255,255,255,.025);color:#e9e9f4}
.hm-hero{position:relative;display:grid;grid-template-columns:1fr .94fr;align-items:center;gap:35px;min-height:625px;padding-top:64px;padding-bottom:55px}
.hm-hero-copy{position:relative;z-index:2}
.hm-hero-eyebrow,.eyebrow{display:inline-flex;align-items:center;gap:9px;color:#c5b5ff;font-size:10px;font-weight:700;letter-spacing:1.15px;text-transform:uppercase}
.live-dot{width:7px;height:7px;flex:0 0 auto;border-radius:50%;background:#56e1ca}
.hm-hero h1{max-width:680px;margin:23px 0 17px;color:#f5f3ff;font-size:clamp(40px,4.5vw,59px);font-weight:700;line-height:1.18;letter-spacing:-2.5px}
.gradient-text{color:#b892ff}
.hm-hero-description{max-width:500px;margin-bottom:16px;color:#aaadbf;font-size:14px;line-height:1.85}
.hm-typing-wrap{display:flex;min-height:28px;align-items:center;gap:8px;margin-bottom:22px;color:#9093aa;font-size:12px}
.hm-typing-line{min-width:190px;color:#d7c8ff;font-family:Poppins,Inter,sans-serif;font-size:13px;font-weight:600}
.hm-hero-actions{display:flex;flex-wrap:wrap;gap:11px}
.hm-trust-line{display:flex;flex-direction:column;gap:8px;margin-top:20px;color:#c5c5d7;font-size:10px}
.hm-hero-art{position:relative;display:grid;min-height:415px;place-items:center;isolation:isolate}
.background-effects{position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:0}
@media(max-width:760px){.page-container{width:calc(100% - 38px)}.navbar{min-height:66px}.nav-links,.nav-cta{display:none}.menu-toggle{display:inline-flex;padding:8px;border:0;border-radius:8px;color:#efefff;background:rgba(255,255,255,.06)}.hm-hero{grid-template-columns:1fr;gap:8px;min-height:auto;padding-top:49px;padding-bottom:35px}.hm-hero-copy{text-align:center}.hm-hero-eyebrow{justify-content:center}.hm-hero h1{max-width:620px;margin:18px auto 14px;font-size:clamp(37px,8.8vw,52px);letter-spacing:-1.8px}.hm-hero-description{max-width:490px;margin:0 auto 13px;font-size:12px}.hm-typing-wrap{justify-content:center}.hm-typing-line{min-width:180px;text-align:left}.hm-hero-actions{justify-content:center}.hm-trust-line{align-items:center;margin-top:16px}.hm-hero-art{width:min(100%,530px);min-width:0;min-height:340px;margin:0 auto;overflow:clip;transform:none}}
@media(max-width:390px){.page-container{width:calc(100% - 30px)}.hm-hero{padding-top:40px}.hm-hero h1{font-size:36px;letter-spacing:-1.6px}.hm-hero-actions{flex-direction:column;align-items:stretch}.hm-hero-actions .button{width:100%}.hm-hero-art{min-height:315px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;transition-duration:.01ms!important}}
`

function sitemapXml() {
  const urls = routes.filter((route) => route !== '/thank-you').map((route) => {
    const priority = route === '/' ? '1.0' : route === '/blog' ? '0.8' : '0.7'
    const frequency = route.startsWith('/blog/') ? 'monthly' : 'weekly'
    return `  <url><loc>${siteUrl}${route}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod><changefreq>${frequency}</changefreq><priority>${priority}</priority></url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}

function robotsTxt() {
  return `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /thank-you\n\nSitemap: ${siteUrl}/sitemap.xml\n`
}

async function waitForServer(child) {
  const deadline = Date.now() + 30000
  let startupError
  child.once('error', (error) => {
    startupError = error
  })
  while (Date.now() < deadline) {
    if (startupError) throw new Error('Could not start the Vite preview server.', { cause: startupError })
    if (child.exitCode !== null) throw new Error(`Vite preview exited with code ${child.exitCode}`)
    try {
      const response = await fetch(origin)
      if (response.ok) return
    } catch {
      await delay(250)
    }
  }
  throw new Error(`Vite preview did not become ready at ${origin}`)
}

function icoFromPng(png) {
  const header = Buffer.alloc(22)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(1, 4)
  header.writeUInt8(32, 6)
  header.writeUInt8(32, 7)
  header.writeUInt8(0, 8)
  header.writeUInt8(0, 9)
  header.writeUInt16LE(1, 10)
  header.writeUInt16LE(32, 12)
  header.writeUInt32LE(png.length, 14)
  header.writeUInt32LE(22, 18)
  return Buffer.concat([header, png])
}

async function createShareAssets(browser) {
  logProgress('Generating Open Graph image and favicon assets.')
  const page = await browser.newPage()
  const iconSvg = await readFile(join(root, 'public', 'rizmern-icon.svg'), 'utf8')
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
  await page.setContent(await readFile(join(root, 'public', 'og-image.svg'), 'utf8'), { waitUntil: 'load' })
  const ogPng = await page.screenshot({ type: 'png' })
  await page.setViewport({ width: 180, height: 180, deviceScaleFactor: 1 })
  await page.setContent(iconSvg, { waitUntil: 'load' })
  const applePng = await page.screenshot({ type: 'png' })
  await page.setViewport({ width: 32, height: 32, deviceScaleFactor: 1 })
  const faviconPng = await page.screenshot({ type: 'png' })

  const assets = [
    ['og-image.png', ogPng],
    ['apple-touch-icon.png', applePng],
    ['favicon.ico', icoFromPng(faviconPng)],
  ]
  for (const [filename, contents] of assets) {
    await writeFile(join(root, 'public', filename), contents)
    await writeFile(join(dist, filename), contents)
  }
  await page.close()
}

async function prerender() {
  const indexPath = join(dist, 'index.html')
  let shell = await readFile(indexPath, 'utf8')
  shell = shell.replace('</head>', `<style id="critical-css">${criticalCss}</style>\n</head>`)
  const assets = await readdir(join(dist, 'assets'))
  const mainFont = assets.find((filename) => filename.startsWith('inter-latin-400-normal') && filename.endsWith('.woff2'))
  const headingFont = assets.find((filename) => filename.startsWith('poppins-latin-700-normal') && filename.endsWith('.woff2'))
  if (!mainFont || !headingFont) throw new Error('A preloaded Inter or Poppins Latin font was not emitted in dist/assets.')
  shell = shell.replace('</head>', `  <link rel="preload" href="/assets/${mainFont}" as="font" type="font/woff2" crossorigin />\n  <link rel="preload" href="/assets/${headingFont}" as="font" type="font/woff2" crossorigin />\n  </head>`)
  await writeFile(indexPath, shell)
  for (const route of routes.filter((item) => item !== '/')) {
    const output = join(dist, ...route.split('/').filter(Boolean), 'index.html')
    await mkdir(dirname(output), { recursive: true })
    await writeFile(output, shell)
  }

  const userDataDir = await mkdtemp(join(tmpdir(), 'rizmern-prerender-'))
  const server = spawn(process.execPath, [viteCli, 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
    cwd: root,
    stdio: 'ignore',
    env: process.env,
  })
  let browser
  try {
    logProgress('Waiting for the Vite preview server.')
    await waitForServer(server)
    logProgress('Launching packaged Chromium with Puppeteer.')
    const executablePath = await getBrowserExecutablePath()
    const browserArgs = process.platform === 'linux'
      ? [...chromium.args, '--disable-dev-shm-usage', '--disable-gpu']
      : ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    browser = await puppeteer.launch({
      headless: process.platform === 'linux' ? 'shell' : true,
      userDataDir,
      executablePath,
      args: browserArgs,
    })
    await createShareAssets(browser)
    const failures = []
    const page = await browser.newPage()
    page.on('pageerror', (error) => failures.push(error.message))
    await page.setCacheEnabled(false)
    await page.setViewport({ width: 1440, height: 1000 })

    for (const route of routes) {
      logProgress(`Prerendering ${route}.`)
      try {
        const routeUrl = route === '/' ? origin : `${origin}${route}/`
        await page.goto(routeUrl, { waitUntil: 'domcontentloaded' })
        await page.waitForSelector('h1', { timeout: 20000 })
        await page.addStyleTag({ content: '*,*::before,*::after{scroll-behavior:auto!important;animation-duration:.001ms!important;animation-delay:0s!important;transition-duration:0s!important}' })
        const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight)
        for (let y = 0; y < pageHeight; y += 700) {
          await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y)
          await delay(35)
        }
        await page.evaluate(() => window.scrollTo(0, 0))
        await delay(150)

        const html = (await page.content()).replaceAll(`${origin}/assets/`, '/assets/')
        const output = route === '/'
          ? join(dist, 'index.html')
          : join(dist, ...route.split('/').filter(Boolean), 'index.html')
        await mkdir(dirname(output), { recursive: true })
        await writeFile(output, html)
        if (route !== '/') await writeFile(join(dist, `${route.slice(1)}.html`), html)
      } catch (error) {
        throw new Error(`Failed to prerender route "${route}".`, { cause: error })
      }
    }
    await page.close()

    if (failures.length) throw new Error(`Browser errors during prerender:\n${failures.join('\n')}`)
    logProgress(`Prerendered ${routes.length} routes successfully.`)
  } finally {
    if (browser) await browser.close()
    server.kill()
    await rm(userDataDir, { recursive: true, force: true })
  }
}

try {
  logProgress(`Preparing sitemap and robots.txt for ${routes.length} routes.`)
  await mkdir(dist, { recursive: true })
  const sitemap = sitemapXml()
  const robots = robotsTxt()
  await writeFile(join(root, 'public', 'sitemap.xml'), sitemap)
  await writeFile(join(root, 'public', 'robots.txt'), robots)
  await writeFile(join(dist, 'sitemap.xml'), sitemap)
  await writeFile(join(dist, 'robots.txt'), robots)
  await prerender()
  logProgress('Postbuild prerender completed.')
} catch (error) {
  process.stderr.write(`[postbuild] Failed: ${error.stack || error.message}\n`)
  process.exitCode = 1
}
