import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../tests/utils.ts'
import Component from './CareerHighlights.astro'
import { getEntry } from 'astro:content'

vi.mock('astro:content', () => ({
  getEntry: vi.fn()
}))

describe('Testing <CareerHighlights /> — uses astro:content getEntry("career-highlights", "data")', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given getEntry returns 3 highlights ["Led X", "Built Y", "Grew Z"]', () => {
    const mockData = {
      data: {
        'career-highlights': [
          { highlight: 'Led X', active: true },
          { highlight: 'Built Y', active: true },
          { highlight: 'Grew Z', active: true }
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
      it('Then it should contain all three highlight strings', () => {
        expect(rendered).toContain('Led X')
        expect(rendered).toContain('Built Y')
        expect(rendered).toContain('Grew Z')
      })
    })
  })

  describe('Given getEntry returns highlights where one has active: false', () => {
    const mockData = {
      data: {
        'career-highlights': [
          { highlight: 'Active Highlight', active: true },
          { highlight: 'Inactive Highlight', active: false }
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
      it('Then it should contain the active highlight text', () => {
        expect(rendered).toContain('Active Highlight')
      })

      it('And it should NOT contain the inactive highlight text', () => {
        expect(rendered).not.toContain('Inactive Highlight')
      })
    })
  })

  describe('Given getEntry returns empty highlights', () => {
    const mockData = {
      data: {
        'career-highlights': []
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
      it('Then it should produce a valid HTML string', () => {
        expect(typeof rendered).toBe('string')
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
