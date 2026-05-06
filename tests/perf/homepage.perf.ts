import lighthouse from 'lighthouse'
import { launch } from 'chrome-launcher'

const BASE_URL = 'http://localhost:4321/'

const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'] as const
const PASS_SCORE = 100

type Category = typeof CATEGORIES[number]

interface CategoryResult {
  category: Category
  score: number
  passed: boolean
}

const runAudit = async (): Promise<CategoryResult[]> => {
  const chrome = await launch({ chromeFlags: ['--headless', '--no-sandbox'] })

  const result = await lighthouse(BASE_URL, {
    port: chrome.port,
    onlyCategories: [...CATEGORIES],
    logLevel: 'silent',
  })

  await chrome.kill()

  if (!result?.lhr) throw new Error('Lighthouse returned no results')

  return CATEGORIES.map((category) => {
    const score = Math.round((result.lhr.categories[category]?.score ?? 0) * 100)
    return { category, score, passed: score >= PASS_SCORE }
  })
}

const run = async () => {
  console.log(`Running Lighthouse audit against ${BASE_URL}\n`)

  const results = await runAudit()
  let failed = false

  results.forEach(({ category, score, passed }) => {
    const icon = passed ? '✅' : '❌'
    const label = category.replace(/-/g, ' ')
    console.log(`${icon} ${label}: ${score}/100`)
    if (!passed) failed = true
  })

  if (failed) {
    console.log('\n❌ Audit failed — one or more categories scored below 100.')
    process.exit(1)
  } else {
    console.log('\n✅ All categories scored 100/100.')
    process.exit(0)
  }
}

run().catch((error) => {
  console.error('Audit failed:', error)
  process.exit(1)
})
