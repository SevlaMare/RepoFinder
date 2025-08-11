import { defineConfig } from 'vitest/config';
// import react from '@vitejs/plugin-react';

export default defineConfig({
  // plugins: [react()],
  test: {
    globals: true,
    setupFiles: ['./tests/vitest.setup.ts'],
    browser: {
      provider: 'playwright',
      enabled: true,
      // headless: !!process.env['CI'],
      instances: [{ browser: 'chromium' }],
      screenshotFailures: false, // disable saving screenshots on failures
      headless: true,
    },
  },
});
