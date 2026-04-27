import { defineConfig, devices } from '@playwright/test'

const snapshotPattern =
  '{snapshotDir}/{testFileDir}/{testFileName}-{projectName}-{name}{ext}'

export default defineConfig({
  testDir: './tests/vrt',
  testMatch: '**/*.vrt.ts',
  fullyParallel: true,
  reporter: 'html',
  snapshotPathTemplate: snapshotPattern,
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Desktop Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],
  webServer: {
    command: 'pnpm preview',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
  },
})
