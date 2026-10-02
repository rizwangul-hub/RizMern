import puppeteer from 'puppeteer-core'
import { access } from 'node:fs/promises'
import { constants } from 'node:fs'

const candidates = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
]

import { spawn } from 'node:child_process'
import { join } from 'node:path'

const viteCli = join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js')
const server = spawn(process.execPath, [viteCli, 'preview', '--host', '127.0.0.1', '--port', '5199', '--strictPort'], {
  cwd: process.cwd(),
  stdio: 'ignore'
})

for (let i = 0; i < 30; i++) {
  try {
    const res = await fetch('http://127.0.0.1:5199/')
    if (res.ok) break
  } catch {}
  await new Promise((r) => setTimeout(r, 200))
}

let execPath
for (const c of candidates) {
  try {
    await access(c, constants.F_OK)
    execPath = c
    break
  } catch {}
}

const browser = await puppeteer.launch({
  executablePath: execPath,
  headless: true,
  args: ['--no-sandbox']
})

const widths = [375, 500, 768, 850, 950, 1024, 1200]

for (const width of widths) {
  const page = await browser.newPage()
  await page.setViewport({ width, height: 800 })
  await page.goto('http://127.0.0.1:5199/', { waitUntil: 'domcontentloaded' })
  // wait 2.5s for any loaders to clear
  await new Promise(r => setTimeout(r, 2500))

  const info = await page.evaluate(() => {
    const navLinks = Array.from(document.querySelectorAll('.nav-links a')).map(a => {
      const rect = a.getBoundingClientRect()
      const top = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)
      return {
        text: a.innerText,
        href: a.getAttribute('href'),
        visible: rect.width > 0 && rect.height > 0 && window.getComputedStyle(a).display !== 'none',
        clickable: top === a || a.contains(top),
        topEl: top ? `${top.tagName}.${top.className}` : 'null'
      }
    })

    const menuToggle = document.querySelector('.menu-toggle')
    let toggleInfo = null
    if (menuToggle) {
      const rect = menuToggle.getBoundingClientRect()
      const top = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)
      toggleInfo = {
        visible: rect.width > 0 && rect.height > 0 && window.getComputedStyle(menuToggle).display !== 'none',
        clickable: top === menuToggle || menuToggle.contains(top),
        topEl: top ? `${top.tagName}.${top.className}` : 'null'
      }
    }

    const header = document.querySelector('.site-header')
    const headerRect = header?.getBoundingClientRect()

    return {
      navLinks,
      toggleInfo,
      headerHeight: headerRect?.height
    }
  })

  console.log(`\n=== Width: ${width}px === (Header height: ${info.headerHeight})`)
  console.log('Toggle:', info.toggleInfo)
  const visibleLinks = info.navLinks.filter(l => l.visible)
  console.log(`Visible desktop links count: ${visibleLinks.length}`)
  if (visibleLinks.length > 0) {
    console.log('Sample links:', visibleLinks.map(l => `${l.text} (clickable: ${l.clickable}, top: ${l.topEl})`))
  }

  // If toggle is visible, click it and test mobile menu links
  if (info.toggleInfo && info.toggleInfo.visible) {
    await page.click('.menu-toggle')
    await new Promise(r => setTimeout(r, 300))
    const mobileLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.mobile-menu a')).map(a => {
        const rect = a.getBoundingClientRect()
        const top = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)
        return {
          text: a.innerText,
          href: a.getAttribute('href'),
          visible: rect.width > 0 && rect.height > 0,
          clickable: top === a || a.contains(top),
          topEl: top ? `${top.tagName}.${top.className}` : 'null'
        }
      })
    })
    console.log('Mobile menu links after open:', mobileLinks)
  }

  await page.close()
}

await browser.close()
