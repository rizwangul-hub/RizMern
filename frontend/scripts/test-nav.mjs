import puppeteer from 'puppeteer-core'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import { access } from 'node:fs/promises'
import { constants } from 'node:fs'

const candidates = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
]

let execPath
for (const c of candidates) {
  try {
    await access(c, constants.F_OK)
    execPath = c
    break
  } catch {}
}

const viteCli = join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js')
const server = spawn(process.execPath, [viteCli, 'preview', '--host', '127.0.0.1', '--port', '5199', '--strictPort'], {
  cwd: process.cwd(),
  stdio: 'inherit'
})

for (let i = 0; i < 30; i++) {
  try {
    const res = await fetch('http://127.0.0.1:5199/')
    if (res.ok) break
  } catch {}
  await new Promise((r) => setTimeout(r, 200))
}

try {
  const browser = await puppeteer.launch({
    executablePath: execPath,
    headless: true,
    args: ['--no-sandbox']
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  
  const consoleMessages = []
  const pageErrors = []
  page.on('console', msg => consoleMessages.push(`[${msg.type()}] ${msg.text()}`))
  page.on('pageerror', err => pageErrors.push(err.message))

  await page.goto('http://127.0.0.1:5199/', { waitUntil: 'networkidle0' })

  // Check element at the position of the Pricing link
  const navLinkInfo = await page.evaluate(() => {
    const link = document.querySelector('a[href="/pricing"]')
    if (!link) return { found: false }
    const rect = link.getBoundingClientRect()
    const topEl = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)
    return {
      found: true,
      text: link.innerText,
      rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
      topElementTag: topEl?.tagName,
      topElementClass: topEl?.className,
      topElementText: topEl?.innerText,
      isSame: topEl === link || link.contains(topEl)
    }
  })

  console.log('Nav link info:', JSON.stringify(navLinkInfo, null, 2))

  // Now attempt to click it
  console.log('Clicking pricing link...')
  await page.click('a[href="/pricing"]')
  await new Promise((r) => setTimeout(r, 1000))

  console.log('New URL:', page.url())
  console.log('Page errors:', pageErrors)
  console.log('Console messages:', consoleMessages.slice(0, 10))

  // Also test mobile view
  await page.setViewport({ width: 375, height: 667 })
  await page.goto('http://127.0.0.1:5199/', { waitUntil: 'networkidle0' })
  const mobileToggle = await page.evaluate(() => {
    const btn = document.querySelector('.menu-toggle')
    if (!btn) return { found: false }
    const rect = btn.getBoundingClientRect()
    const topEl = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)
    return {
      found: true,
      rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
      topElementTag: topEl?.tagName,
      topElementClass: topEl?.className,
      topElementSrc: topEl?.src,
      topElementHtml: topEl?.outerHTML?.slice(0, 150),
      isSame: topEl === btn || btn.contains(topEl)
    }
  })
  console.log('Mobile menu toggle info:', JSON.stringify(mobileToggle, null, 2))

  if (mobileToggle.found) {
    await page.click('.menu-toggle')
    await new Promise((r) => setTimeout(r, 500))
    const mobileMenuLinks = await page.evaluate(() => {
      const menu = document.querySelector('.mobile-menu')
      const pricingLink = document.querySelector('.mobile-menu a[href="/pricing"]')
      return {
        menuVisible: Boolean(menu),
        pricingFound: Boolean(pricingLink)
      }
    })
    const mobilePricingInfo = await page.evaluate(() => {
      const link = document.querySelector('.mobile-menu a[href="/pricing"]')
      if (!link) return { found: false }
      const rect = link.getBoundingClientRect()
      const topEl = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)
      return {
        found: true,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        offsetParent: Boolean(link.offsetParent),
        computedStyle: {
          display: window.getComputedStyle(link).display,
          visibility: window.getComputedStyle(link).visibility,
          opacity: window.getComputedStyle(link).opacity,
          pointerEvents: window.getComputedStyle(link).pointerEvents
        },
        menuComputedStyle: {
          display: window.getComputedStyle(link.parentElement).display,
          height: link.parentElement.offsetHeight,
          overflow: window.getComputedStyle(link.parentElement).overflow
        },
        topElementTag: topEl?.tagName,
        topElementClass: topEl?.className,
        isSame: topEl === link || link.contains(topEl)
      }
    })
    console.log('Mobile pricing link info:', JSON.stringify(mobilePricingInfo, null, 2))
  }

  await browser.close()
} finally {
  server.kill()
}
