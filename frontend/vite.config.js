import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setupTests.ts'],
    include: ['**/*.test.tsx', '**/*.test.ts'],
    coverage: {
      provider: 'v8'
    },
  },
})