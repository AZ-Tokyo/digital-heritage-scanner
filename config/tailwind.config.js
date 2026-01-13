import themePlugin from '@digital-go-jp/tailwind-theme-plugin'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['../popup.html', '../src/**/*.{ts,tsx}'],
    plugins: [themePlugin],
}
