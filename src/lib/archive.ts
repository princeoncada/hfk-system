import fs from 'fs'
import path from 'path'

const ARCHIVES_DIR = path.join(process.cwd(), 'archives')

export async function archiveExport(
  id: string,
  format: 'pdf' | 'png',
  sourcePath: string
): Promise<string> {
  const dateFolder = new Date().toISOString().split('T')[0]
  const destDir = path.join(ARCHIVES_DIR, dateFolder)
  fs.mkdirSync(destDir, { recursive: true })

  const destPath = path.join(destDir, `${id}.${format}`)
  fs.renameSync(sourcePath, destPath)

  return destPath
}
