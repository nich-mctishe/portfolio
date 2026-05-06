import lighthouse from 'lighthouse'
import { launch } from 'chrome-launcher'

const BASE_URL = 'http://localhost:4321/'

const CATEGORIES = [
  'performance', 'accessibility', 'best-practices', 'seo',
] as const
const GATED_CATEGORIES = new Set(['accessibility', 'best-practices', 'seo'])

type Category = typeof CATEGORIES[number]

interface CategoryResult {
  category: Category
  score: number
  gated: boolean
}

const runAudit = async (): Promise<CategoryResult[]> => {
  const chrome = await launch({ chromeFlags: ['--headless', '--no-sandbox'] })

  const result = await lighthouse(BASE_URL, {
    port: chrome.port,
    onlyCategories: [...CATEGORIES],
    logLevel: 'silent',
  })

  chrome.kill()

  if (!result?.lhr) throw new Error('Lighthouse returned no results')

  return CATEGORIES.map((category) => {
    const raw = result.lhr.categories[category]?.score ?? 0
    const score = Math.round(raw * 100)

    return { category, score, gated: GATED_CATEGORIES.has(category) }
  })
}

const run = async () => {
  console.log(`Running Lighthouse audit against ${BASE_URL}\n`)

  const results = await runAudit()
  let failed = false

  results.forEach(({ category, score, gated }) => {
    const passed = score >= 100
    const label = category.replaceAll('-', ' ')
    if (gated) {
      const icon = passed ? '✅' : '❌'
      console.log(`${icon} ${label}: ${score}/100`)
      if (!passed) failed = true
    } else {
      console.log(`ℹ️  ${label}: ${score}/100 (advisory)`)
    }
  })

  if (failed) {
    console.log(
      '\n❌ Audit failed — one or more gated categories scored below 100.',
    )
    process.exit(1)
  } else {
    console.log('\n✅ All gated categories passed.')
    process.exit(0)
  }
}

run().catch((error) => {
  console.error('Audit failed:', error)
  process.exit(1)
})
