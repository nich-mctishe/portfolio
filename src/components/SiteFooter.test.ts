import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../tests/utils.ts'
import Component from './SiteFooter.astro'
import { getEntry } from 'astro:content'

vi.mock('astro:content', () => ({
  getEntry: vi.fn()
}))

describe('Testing <SiteFooter /> — uses astro:content getEntry("personal", "data")', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-06-01T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Given personal data with 2 socials', () => {
    const mockData = {
      data: {
        name: 'Nicholas Headlong',
        socials: [
          { platform: 'GitHub', url: 'https://github.com/nich-mctishe', icon: 'github.svg' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/in/nicholas-headlong', icon: 'linkedin.svg' }
        ]
      }
    }
    let rendered: string | null = null

    beforeEach(async () => {
      vi.mocked(getEntry).mockResolvedValue(mockData as any)
      rendered = (await render(Component)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should contain both social link hrefs', () => {
        expect(rendered).toContain('https://github.com/nich-mctishe')
        expect(rendered).toContain('https://linkedin.com/in/nicholas-headlong')
      })

      it('Then it should contain the user name in the credits', () => {
        expect(rendered).toContain('Nicholas Headlong')
      })

      it('Then it should contain the current year (2026)', () => {
        expect(rendered).toContain('2026')
      })
    })
  })

  describe('Given getEntry returns null', () => {
    let rendered: string | null = null

    beforeEach(async () => {
      vi.mocked(getEntry).mockResolvedValue(null)
      rendered = (await render(Component)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should yield a valid HTML string without throwing', () => {
        expect(typeof rendered).toBe('string')
      })
    })
  })
})
