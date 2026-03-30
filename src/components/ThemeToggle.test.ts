import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../tests/utils.ts'
import Component from './ThemeToggle.astro'

describe('Testing <ThemeToggle /> (no props)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given any scenario (no props)', () => {
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should contain the #theme-toggle button', () => {
        expect(rendered).toContain('id="theme-toggle"')
      })

      it('Then it should contain both sun and moon SVG icons', () => {
        expect(rendered).toContain('icon-sun')
        expect(rendered).toContain('icon-moon')
      })
    })
  })
})
