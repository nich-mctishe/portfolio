import { Given, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CustomWorld } from '../support/world.js'

Given('I open the portfolio homepage', async function (this: CustomWorld) {
  // Use localhost in dev mode or a configured base URL if deployed
  const baseURL = process.env.BASE_URL || 'http://localhost:4321/'
  await this.page!.goto(baseURL)
  // Wait for the full page load, especially with Astro animations
  await this.page!.waitForLoadState('networkidle')
})

Then('I should see the Hero section', async function (this: CustomWorld) {
  await expect(this.page!.locator('#hero')).toBeVisible()
})

Then('I should see the Career Highlights section', 
  async function (this: CustomWorld) {
    await expect(this.page!.locator('#career-highlights')).toBeVisible()
  }
)

Then('I should see the Skills section', async function (this: CustomWorld) {
  await expect(this.page!.locator('#skills')).toBeVisible()
})

Then('I should see the Work Experience section', 
  async function (this: CustomWorld) {
    await expect(this.page!.locator('#experience')).toBeVisible()
  }
)

Then('I should see the Education section', async function (this: CustomWorld) {
  await expect(this.page!.locator('#education')).toBeVisible()
})

Then('I should see the Clients section', async function (this: CustomWorld) {
  await expect(this.page!.locator('#clients')).toBeVisible()
})

Then('the page title should contain {string}', 
  async function (this: CustomWorld, title: string) {
    const titleRegex = new RegExp(title, 'i')
    await expect(this.page!).toHaveTitle(titleRegex)
  }
)

Then('I should see {string} in the page', 
  async function (this: CustomWorld, text: string) {
    await expect(this.page!.getByText(text).first()).toBeVisible()
  }
)
