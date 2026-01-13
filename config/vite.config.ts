import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import manifest from '../manifest.json'
import pkg from '../package.json'

// package.json のバージョンを manifest.json に反映
const manifestWithVersion = {
    ...manifest,
    version: pkg.version,
}

export default defineConfig({
    plugins: [crx({ manifest: manifestWithVersion })],
    css: {
        postcss: './config'
    },
    build: {
        rollupOptions: {
            input: {
                popup: 'popup.html',
                sidepanel: 'sidepanel.html',
            },
        },
    },
})
