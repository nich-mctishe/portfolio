import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../tests/utils.ts'
import Component from './Hero.astro'
import { getEntry } from 'astro:content'

vi.mock('astro:content', () => ({
  getEntry: vi.fn()
}))

describe('Testing <Hero /> — uses astro:content getEntry("personal", "data")', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given getEntry returns valid personal data', () => {
    const mockData = {
      data: {
        name: 'Nicholas Headlong',
        title: 'Senior Software Engineer',
        description: 'Building bridges with code.',
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
      it('Then it should contain the user name', () => {
        expect(rendered).toContain('Nicholas Headlong')
      })

      it('Then it should contain the job title', () => {
        expect(rendered).toContain('Senior Software Engineer')
      })

      it('Then it should contain the description', () => {
        expect(rendered).toContain('Building bridges with code.')
      })

      it('Then it should contain both social link hrefs', () => {
        expect(rendered).toContain('https://github.com/nich-mctishe')
        expect(rendered).toContain('https://linkedin.com/in/nicholas-headlong')
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
      it('Then it should contain the fallback name "Name"', () => {
        expect(rendered).toContain('Name')
      })

      it('And it should contain the fallback title "Title"', () => {
        expect(rendered).toContain('Title')
      })
    })
  })
})
