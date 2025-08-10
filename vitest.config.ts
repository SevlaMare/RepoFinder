import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environmentMatchGlobs: [
      ['src/tests/**/*.test.ts', 'default'],

      // all tests in tests/dom will run in jsdom
      // ['src/tests/dom/**', 'jsdom'],
    ],
  },
});
