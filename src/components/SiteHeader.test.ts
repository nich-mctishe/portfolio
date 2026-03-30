import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../tests/utils.ts'
import Component from './SiteHeader.astro'
import { getEntry } from 'astro:content'

vi.mock('astro:content', () => ({
  getEntry: vi.fn()
}))

describe('Testing <SiteHeader /> — uses astro:content getEntry("personal", "data")', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given showThemeToggle is true', () => {
    const mockData = {
      data: {
        name: 'Nicholas Headlong',
        title: 'Senior Software & DevOps',
        showThemeToggle: true
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
      it('Then it should contain the theme toggle button', () => {
        expect(rendered).toContain('id="theme-toggle"')
      })
    })
  })

  describe('Given showThemeToggle is false', () => {
    const mockData = {
      data: {
        name: 'Nicholas Headlong',
        title: 'Senior Software & DevOps',
        showThemeToggle: false
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
      it('Then it should NOT contain the theme toggle button', () => {
        expect(rendered).not.toContain('id="theme-toggle"')
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
    })
  })
})
