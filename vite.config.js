import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)))

export default defineConfig({
  plugins: [react()],
  // Relative base so the build works on GitHub Pages under /<repo-name>/.
  base: './',
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      // Coverage is measured on the domain layer, where the conversion logic lives.
      include: ['src/domain/**/*.js'],
      exclude: ['src/domain/__tests__/**'],
      reporter: ['text', 'html', 'json-summary'],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
})
