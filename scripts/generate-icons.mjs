import sharp from 'sharp'
import { mkdir } from 'fs/promises'

const sizes = [16, 48, 128]

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="16" fill="#0055AA"/>
  <circle cx="52" cy="52" r="24" stroke="white" stroke-width="6" fill="none"/>
  <line x1="70" y1="70" x2="96" y2="96" stroke="white" stroke-width="8" stroke-linecap="round"/>
  <rect x="40" y="80" width="48" height="6" rx="3" fill="white" opacity="0.8"/>
  <rect x="40" y="92" width="36" height="6" rx="3" fill="white" opacity="0.6"/>
  <rect x="40" y="104" width="24" height="6" rx="3" fill="white" opacity="0.4"/>
</svg>`

async function generateIcons() {
    await mkdir('icons', { recursive: true })

    for (const size of sizes) {
        await sharp(Buffer.from(svg))
            .resize(size, size)
            .png()
            .toFile(`icons/icon${size}.png`)
        console.log(`Generated icons/icon${size}.png`)
    }
}

generateIcons().catch(console.error)
