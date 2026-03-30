import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../tests/utils.ts'
import Component from './Experience.astro'
import { getEntry } from 'astro:content'

vi.mock('astro:content', () => ({
  getEntry: vi.fn()
}))

describe('Testing <Experience /> — uses astro:content getEntry("experience", "data")', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given 1 active job', () => {
    const mockData = {
      data: {
        jobs: [
          { company: 'Lululemon', role: 'Senior Engineer', active: true }
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
      it('Then it should contain the company name', () => {
        expect(rendered).toContain('Lululemon')
      })

      it('Then it should contain the role name', () => {
        expect(rendered).toContain('Senior Engineer')
      })
    })
  })

  describe('Given a job with active: false', () => {
    const mockData = {
      data: {
        jobs: [
          { company: 'Active Job', role: 'Dev', active: true },
          { company: 'Inactive Job', role: 'Dev', active: false }
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
      it('Then it should contain the active company name', () => {
        expect(rendered).toContain('Active Job')
      })

      it('And it should NOT contain the inactive company name', () => {
        expect(rendered).not.toContain('Inactive Job')
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
