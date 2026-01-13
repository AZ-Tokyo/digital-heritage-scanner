import themePlugin from '@digital-go-jp/tailwind-theme-plugin'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./pages/*.html', './src/**/*.{ts,tsx}'],
    plugins: [themePlugin],
}
