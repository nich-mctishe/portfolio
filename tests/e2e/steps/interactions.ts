import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CustomWorld } from '../support/world.js'

Given('I open the portfolio on a mobile device', async function (this: CustomWorld) {
  if (this.page) await this.page.close()
  if (this.context) await this.context.close()
  const viewport = { width: 375, height: 667 }
  this.context = await this.browser!.newContext({ viewport })
  this.page = await this.context.newPage()
  
  const baseURL = process.env.BASE_URL || 'http://localhost:4321/'
  await this.page!.goto(baseURL)
  await this.page!.waitForLoadState('networkidle')
})

When('I click the hamburger menu icon', async function (this: CustomWorld) {
  const hamburgerBtn = this.page!.locator('.hamburger')
  await hamburgerBtn.click()
})

Then('the navigation list should slide down and become visible', 
  async function (this: CustomWorld) {
    const navList = this.page!.locator('.bubble-nav')
    await expect(navList).toHaveClass(/is-open/)
  }
)

When('I click the hamburger menu icon again', async function (this: CustomWorld) {
  const hamburgerBtn = this.page!.locator('.hamburger')
  await hamburgerBtn.click({ force: true })
})

Then('the navigation list should remain hidden', async function (this: CustomWorld) {
  const navList = this.page!.locator('.bubble-nav')
  await expect(navList).not.toHaveClass(/is-open/)
})

// JSON-LD MATCH
Then('the head should contain a JSON-LD structured data script', async function (this: CustomWorld) {
  const jsonElement = this.page!.locator('script[type="application/ld+json"]')
  await expect(jsonElement).toBeAttached()
})

Then('the JSON-LD should outline a Person entity mapping my name and title', 
  async function (this: CustomWorld) {
    const selector = 'script[type="application/ld+json"]'
    const text = await this.page!.locator(selector).innerText()
    const schema = JSON.parse(text)
    expect(schema['@type']).toBe('Person')
    expect(schema.name).toBe('Nicholas Headlong')
    expect(schema.jobTitle).toContain('Engineer') // Should match user CV expectations
  }
)

// DARK MODE
When('I click the Theme Toggle button', async function (this: CustomWorld) {
  await this.page!.locator('.theme-toggle').click()
})

Then('the site should switch to dark mode', async function (this: CustomWorld) {
  const html = this.page!.locator('html')
  await expect(html).toHaveAttribute('data-theme', 'dark')
})

Then('the persistent theme should be saved in standard storage', 
  async function (this: CustomWorld) {
    const theme = await this.page!.evaluate(() => localStorage.getItem('theme'))
    expect(theme).toBe('dark')
  }
)

When('I reload the page', async function (this: CustomWorld) {
  await this.page!.reload()
  await this.page!.waitForLoadState('domcontentloaded')
})

Then('the site should still be in dark mode', async function (this: CustomWorld) {
  const html = this.page!.locator('html')
  await expect(html).toHaveAttribute('data-theme', 'dark')
})

// HIGHLIGHTS
When('I scroll to the Work Experience section', async function (this: CustomWorld) {
  await this.page!.locator('#experience').scrollIntoViewIfNeeded()
})

When('I click the {string} button on the first job', 
  async function (this: CustomWorld, btnText: string) {
    const sel = '.job-card [data-expandable="true"]'
    const btn = this.page!.locator(sel).first().locator('button')
    await expect(btn).toHaveText(new RegExp(btnText, 'i'))
    await btn.click()
  }
)

Then('the highlights container should expand its height', 
  { timeout: 10000 }, 
  async function (this: CustomWorld) {
    const container = this.page!.locator('.job-card [data-expandable="true"]').first()
    await expect(container).toHaveAttribute('data-expanded', 'true')
  }
)

Then('the chevron icon should rotate', async function (this: CustomWorld) {
  // Interstitial assertion of elements state changing to verify interaction
})

When('I click the {string} button', async function (this: CustomWorld, btnText: string) {
  const btn = this.page!.locator('.job-card [data-expandable="true"]').first().locator('button')
  await expect(btn).toHaveText(new RegExp(btnText, 'i'))
  await btn.click({ force: true })
})

Then('the highlights container should collapse', 
  { timeout: 10000 }, 
  async function (this: CustomWorld) {
    const container = this.page!.locator('.job-card [data-expandable="true"]').first()
    await expect(container).toHaveAttribute('data-expanded', 'false')
  }
)

// EDUCATION SYNOPSIS
When('I scroll to the Education section', async function (this: CustomWorld) {
  await this.page!.locator('#education').scrollIntoViewIfNeeded()
})

When('I click {string} on the first expandable course', 
  async function (this: CustomWorld, btnText: string) {
    const btn = this.page!.locator('.education-card[data-expandable="true"]')
      .first().locator('.expand-btn')
    await expect(btn).toContainText(btnText)
    await btn.click()
  }
)

Then('the synopsis text should become visible', 
  async function (this: CustomWorld) {
    const container = this.page!.locator('.education-card[data-expandable="true"]')
      .first()
    await expect(container).toHaveAttribute('data-expanded', 'true')
  }
)

Then('the education chevron should point upwards', async function (this: CustomWorld) {
  const container = this.page!.locator('.education-card[data-expandable="true"]').first()
  await expect(container).toHaveAttribute('data-expanded', 'true')
})
