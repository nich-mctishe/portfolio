import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../tests/utils.ts'
import Component from './index.astro'
import { getEntry } from 'astro:content'

vi.mock('astro:content', () => ({
  getEntry: vi.fn()
}))

describe('Testing <IndexPage /> — The primary landing page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given a standard content setup', () => {
    const mockPersonal = {
      data: {
        name: 'Nicholas Headlong',
        title: 'Solution Architect',
        description: 'First line.',
        socials: []
      }
    }
    
    let rendered: string | null = null

    beforeEach(async () => {
      // Multiple components on index.astro call getEntry, we just mock a generic one for now
      vi.mocked(getEntry).mockResolvedValue(mockPersonal as any)
      rendered = (await render(Component)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the index page is rendered', () => {
      it('Then it should contain the "Work Experience" section', () => {
        expect(rendered).toContain('Work Experience')
      })

      it('And it should contain the "Skills" section', () => {
        expect(rendered).toContain('Skills')
      })

      it('And it should contain the "Education" section', () => {
        expect(rendered).toContain('Education')
      })

      it('And it should contain the footer', () => {
        expect(rendered).toContain('site-footer')
      })
    })
  })
})
