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

      it('And it should render an ExpandableButton with text "View all highlights"', () => {
        expect(rendered).toContain('expand-btn')
        expect(rendered).toContain('View all highlights')
      })

      it('And the ExpandableButton should have aria-label "Expand highlights"', () => {
        expect(rendered).toContain('aria-label="Expand highlights"')
      })

      it('And the ExpandableButton should have the job-highlight-btn class', () => {
        expect(rendered).toContain('job-highlight-btn')
      })

      it('And the ExpandableButton should render the chevron SVG', () => {
        expect(rendered).toContain('class="chevron"')
      })
    })
  })

  describe('Given a single highlight and scrollTarget="#job-2"', () => {
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

      it('And it should NOT render an ExpandableButton', () => {
        expect(rendered).not.toContain('expand-btn')
        expect(rendered).not.toContain('View all highlights')
      })
    })
  })

  describe('Given an empty highlights array and scrollTarget="#job-3"', () => {
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
      it('Then it should not render the highlights-container', () => {
        expect(rendered).not.toContain('highlights-container')
      })

      it('And it should not render an ExpandableButton', () => {
        expect(rendered).not.toContain('expand-btn')
      })
    })
  })

  describe('Given no highlights prop and scrollTarget="#job-4"', () => {
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
      it('Then it should not render the highlights-container without throwing', () => {
        expect(rendered).not.toContain('highlights-container')
      })

      it('And it should not render an ExpandableButton', () => {
        expect(rendered).not.toContain('expand-btn')
      })
    })
  })
})
