import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../tests/utils.ts'
import Component from './Education.astro'
import { getEntry } from 'astro:content'

vi.mock('astro:content', () => ({
  getEntry: vi.fn()
}))

describe('Testing <Education /> — uses astro:content getEntry("education", "data")', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given 1 active qualification', () => {
    const mockData = {
      data: {
        qualifications: [
          { 
            degree: 'BSc Computer Science', 
            institution: 'Falmouth', 
            year: '2010',
            active: true 
          }
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
      it('Then it should contain the degree title', () => {
        expect(rendered).toContain('BSc Computer Science')
      })

      it('Then it should contain the institution name', () => {
        expect(rendered).toContain('Falmouth')
      })

      it('Then it should contain the year', () => {
        expect(rendered).toContain('2010')
      })
    })
  })

  describe('Given a qualification with active: false', () => {
    const mockData = {
      data: {
        qualifications: [
          { degree: 'Active Degree', institution: 'Active Uni', active: true },
          { degree: 'Inactive Degree', institution: 'Inactive Uni', active: false }
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
      it('Then it should contain the active degree title', () => {
        expect(rendered).toContain('Active Degree')
      })

      it('And it should NOT contain the inactive degree title', () => {
        expect(rendered).not.toContain('Inactive Degree')
      })
    })
  })

  describe('Given 1 qualification with a synopsis', () => {
    const mockData = {
      data: {
        qualifications: [
          { 
            degree: 'Degree', 
            institution: 'Uni', 
            synopsis: 'A very detailed course summary.',
            active: true 
          }
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
      it('Then it should contain the synopsis text', () => {
        expect(rendered).toContain('A very detailed course summary.')
      })

      it('And it should have data-expandable="true"', () => {
        expect(rendered).toContain('data-expandable="true"')
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
