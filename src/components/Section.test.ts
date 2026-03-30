import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../tests/utils.ts'
import Component from './Section.astro'

describe('Testing <Section id?:string isFullWidth?:boolean />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given id="career-highlights"', () => {
    const id = 'career-highlights'
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component, { id })).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should have the correct id attribute', () => {
        expect(rendered).toContain(`id="${id}"`)
      })
    })
  })

  describe('Given isFullWidth=true', () => {
    const isFullWidth = true
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component, { id: 'test', isFullWidth })).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should contain the full-width class', () => {
        expect(rendered).toContain('full-width')
      })
    })
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
      it('Then it should produce a valid HTML string without throwing', () => {
        expect(typeof rendered).toBe('string')
        expect(rendered?.length).toBeGreaterThan(0)
      })
    })
  })
})
