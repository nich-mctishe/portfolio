import { test, expect } from '@playwright/test'

test.describe('Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    // Set VRT mode for deterministic components
    await page.addInitScript(() => {
      (window as any).__VRT__ = true
    })
  })

  test('Homepage maintains layout integrity', async ({ page }) => {
    await page.goto('/')
    
    // Ensure all critical animations and elements are loaded
    await page.waitForLoadState('networkidle')

    // Wait for Astro scroll animations to settle or reveal classes to trigger
    await page.waitForTimeout(1000) 

    await expect(page).toHaveScreenshot('homepage-layout.png', {
      fullPage: true,
      maxDiffPixels: 1000,
      mask: [
        page.locator('.bubbles-bg'), 
        page.locator('.bubble-large')
      ],
      animations: 'disabled',
    })
  })

  test('Dark mode maintains layout integrity', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Toggle dark mode
    const themeBtn = page.locator('button[aria-label="Toggle dark mode"]')
    if (await themeBtn.isVisible()) {
      await themeBtn.click()
      await page.waitForTimeout(500) // Wait for transition
    }

    await expect(page).toHaveScreenshot('homepage-darkmode.png', {
      fullPage: true,
      maxDiffPixels: 1000,
      mask: [
        page.locator('.bubbles-bg'), 
        page.locator('.bubble-large')
      ],
      animations: 'disabled',
    })
  })

  test('Skills section maintains design', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const section = page.locator('#skills')
    await section.scrollIntoViewIfNeeded()
    await expect(section).toHaveScreenshot('section-skills.png', {
      maxDiffPixels: 50
    })
  })

  test('Experience section maintains design', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const section = page.locator('#experience')
    await section.scrollIntoViewIfNeeded()
    await expect(section).toHaveScreenshot('section-experience.png', {
      maxDiffPixels: 50
    })
  })

  test('Education section maintains design', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const section = page.locator('#education')
    await section.scrollIntoViewIfNeeded()
    await expect(section).toHaveScreenshot('section-education.png', {
      maxDiffPixels: 50
    })
  })

  test('Clients section maintains design', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const section = page.locator('#clients')
    await section.scrollIntoViewIfNeeded()
    await expect(section).toHaveScreenshot('section-clients.png', {
      maxDiffPixels: 50
    })
  })

  test('Footer maintains design', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const footer = page.locator('.site-footer')
    await footer.scrollIntoViewIfNeeded()
    await expect(footer).toHaveScreenshot('footer.png', {
      maxDiffPixels: 50
    })
  })
})
