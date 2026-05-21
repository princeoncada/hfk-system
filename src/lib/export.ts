import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const EXPORTS_DIR = path.join(process.cwd(), 'exports')

export async function exportToPDF(id: string): Promise<string> {
  fs.mkdirSync(path.join(EXPORTS_DIR, 'pdf'), { recursive: true })
  const pdfPath = path.join(EXPORTS_DIR, 'pdf', `${id}.pdf`)

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.emulateMediaType('print')
  await page.goto(`http://localhost:3000/preview/${id}`, {
    waitUntil: 'networkidle2',
  })
  await page.pdf({ format: 'A4', printBackground: true, path: pdfPath })
  await browser.close()

  return pdfPath
}

export async function exportToPNG(id: string): Promise<string> {
  fs.mkdirSync(path.join(EXPORTS_DIR, 'png'), { recursive: true })
  const pngPath = path.join(EXPORTS_DIR, 'png', `${id}.png`)

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 816, height: 1056 })
  await page.goto(`http://localhost:3000/preview/${id}`, {
    waitUntil: 'networkidle2',
  })
  await page.evaluate(() => {
    document
      .querySelectorAll<HTMLElement>('.no-print')
      .forEach((el) => (el.style.display = 'none'))
  })
  await page.screenshot({ fullPage: true, path: pngPath })
  await browser.close()

  return pngPath
}
