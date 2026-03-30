import { setWorldConstructor, World } from '@cucumber/cucumber'
import type { IWorldOptions } from '@cucumber/cucumber'
import type { Browser, BrowserContext, Page } from '@playwright/test'

export class CustomWorld extends World {
  browser: Browser | null = null
  context: BrowserContext | null = null
  page: Page | null = null

  constructor(options: IWorldOptions) {
    super(options)
  }
}

setWorldConstructor(CustomWorld)
