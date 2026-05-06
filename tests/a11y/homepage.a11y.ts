import { chromium, type Page } from '@playwright/test'
import { injectAxe, getViolations } from 'axe-playwright'

const BASE_URL = 'http://localhost:4321/'

const auditPage = async (page: Page, theme: 'light' | 'dark') => {
  await page.goto(BASE_URL)
  await page.waitForLoadState('networkidle')

  if (theme === 'dark') {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark')
    })
    // Allow CSS transitions to settle
    await page.waitForTimeout(300)
  }

  await injectAxe(page)
  const violations = await getViolations(page)

  return violations
}

const run = async () => {
  const browser = await chromium.launch()
  const themes: Array<'light' | 'dark'> = ['light', 'dark']
  let totalViolations = 0

  for (const theme of themes) {
    const page = await browser.newPage()
    const violations = await auditPage(page, theme)
    await page.close()

    if (violations.length === 0) {
      console.log(`✅ [${theme} mode] No accessibility violations found!`)
    } else {
      console.log(
        `❌ [${theme} mode] Found ${violations.length} violation(s):\n`
      )
      violations.forEach((violation, index) => {
        console.log(
          `${index + 1}. [${violation.impact?.toUpperCase()}] ${violation.id}`
        )
        console.log(`   Description: ${violation.description}`)
        console.log(`   Help: ${violation.helpUrl}`)
        console.log(`   Nodes affected: ${violation.nodes.length}`)
        violation.nodes.forEach((node) => {
          console.log(`     - ${node.html.slice(0, 120)}`)
          if (node.failureSummary) {
            const fix = node.failureSummary.split('\n')[1]?.trim()
            console.log(`       Fix: ${fix}`)
          }
        })
        console.log()
      })
      totalViolations += violations.length
    }
  }

  await browser.close()
  process.exit(totalViolations > 0 ? 1 : 0)
}

run().catch((error) => {
  console.error('Audit failed:', error)
  process.exit(1)
})
