import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from "node:path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(new URL(import.meta.url).pathname), "./src"),
    },
  },
  test: {
    reporters: ['default', 'html'],
    outputFile: {
      html: './reports/test-report.html',
    },
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
    },
  },
})