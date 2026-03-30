import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../tests/utils.ts'
import Component from './Clients.astro'
import { getEntry } from 'astro:content'

vi.mock('astro:content', () => ({
  getEntry: vi.fn()
}))

describe('Testing <Clients /> — uses astro:content getEntry("clients", "data")', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given 2 active clients', () => {
    const mockData = {
      data: {
        clients: [
          { name: 'Lululemon', logoUrl: '/logos/lululemon.svg', active: true },
          { name: 'HBO', logoUrl: '/logos/hbo.svg', active: true }
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
      it('Then it should contain both client names in alt text', () => {
        expect(rendered).toContain('alt="Lululemon"')
        expect(rendered).toContain('alt="HBO"')
      })
    })
  })

  describe('Given a client with active: false', () => {
    const mockData = {
      data: {
        clients: [
          { name: 'Active Client', logoUrl: '/logos/active.svg', active: true },
          { name: 'Inactive Client', logoUrl: '/logos/inactive.svg', active: false }
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
      it('Then it should contain the active client logo', () => {
        expect(rendered).toContain('alt="Active Client"')
      })

      it('And it should NOT contain the inactive client logo', () => {
        expect(rendered).not.toContain('alt="Inactive Client"')
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
