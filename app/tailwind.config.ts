import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
    },
  },
  plugins: [],
}
export default config
