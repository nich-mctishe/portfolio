import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber'
import { chromium } from '@playwright/test'
import type { Browser } from '@playwright/test'
import { CustomWorld } from './world.js'

let browser: Browser

BeforeAll(async function () {
  const isCI = !!process.env.CI
  browser = await chromium.launch({ headless: isCI })
})

AfterAll(async function () {
  await browser.close()
})

Before(async function (this: CustomWorld) {
  this.browser = browser
  this.context = await browser.newContext()
  this.page = await this.context.newPage()
})

After(async function (this: CustomWorld) {
  if (this.page) await this.page.close()
  if (this.context) await this.context.close()
})
