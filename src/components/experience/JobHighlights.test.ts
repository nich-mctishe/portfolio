import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../../tests/utils.ts'
import Component from './JobHighlights.astro'

describe('Testing <JobHighlights highlights?:string[] scrollTarget:string />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given highlights=["Led platform migration","Reduced costs by 30%"] and scrollTarget="#job-1"', () => {
    const props = {
      highlights: ['Led platform migration', 'Reduced costs by 30%'],
      scrollTarget: '#job-1'
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should contain both highlight strings', () => {
        expect(rendered).toContain('Led platform migration')
        expect(rendered).toContain('Reduced costs by 30%')
      })

      it('And it should have data-expandable="true"', () => {
        expect(rendered).toContain('data-expandable="true"')
      })

      it('And it should have the correct data-scroll-target', () => {
        expect(rendered).toContain('data-scroll-target="#job-1"')
      })
    })
  })

  describe('Given a single highlight', () => {
    const props = {
      highlights: ['Single highlight'],
      scrollTarget: '#job-2'
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should contain the highlight string', () => {
        expect(rendered).toContain('Single highlight')
      })

      it('And it should have data-expandable="false"', () => {
        expect(rendered).toContain('data-expandable="false"')
      })
    })
  })

  describe('Given an empty highlights array', () => {
    const props = {
      highlights: [],
      scrollTarget: '#job-3'
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should return an empty string (excluding scripts)', () => {
        expect(rendered).not.toContain('highlights-container')
      })
    })
  })

  describe('Given no highlights prop', () => {
    const props = {
      scrollTarget: '#job-4'
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component, props as any)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should return an empty string (excluding scripts) without throwing', () => {
        expect(rendered).not.toContain('highlights-container')
      })
    })
  })
})
