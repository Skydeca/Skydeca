/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Tailwind will scan everything in your /src folder
    "./app/**/*.{js,ts,jsx,tsx}", // (optional) if you use an /app directory outside src
    "./components/**/*.{js,ts,jsx,tsx}", // if you’re using a /components folder
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ['var(--font-sora)'],
        geist: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
}
