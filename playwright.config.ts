import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/vrt',
  testMatch: '**/*.vrt.ts',
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Desktop Chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 }
      },
    },
    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 13'],
        viewport: { width: 390, height: 844 }
      },
    },
    {
      name: 'Tablet iPad',
      use: { 
        ...devices['iPad'],
        viewport: { width: 768, height: 1024 }
      },
    },
  ],
  webServer: {
    command: 'pnpm preview',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
  },
})
