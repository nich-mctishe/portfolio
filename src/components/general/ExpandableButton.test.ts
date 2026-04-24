import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../../tests/utils.ts'
import ExpandableButton from './ExpandableButton.astro'

describe('Testing <ExpandableButton text:string ariaLabel?:string class?:string />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given text="View all highlights" and no optional props', () => {
    const props = { text: 'View all highlights' }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(ExpandableButton, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should render a <button> element', () => {
        expect(rendered).toContain('<button')
      })

      it('Then it should include the expand-btn class', () => {
        expect(rendered).toContain('expand-btn')
      })

      it('Then it should render the text inside .btn-text', () => {
        expect(rendered).toContain('View all highlights')
        expect(rendered).toContain('btn-text')
      })

      it('Then it should use the default aria-label "Expand details"', () => {
        expect(rendered).toContain('aria-label="Expand details"')
      })

      it('Then it should render the chevron SVG', () => {
        expect(rendered).toContain('class="chevron"')
        expect(rendered).toContain('<polyline')
        expect(rendered).toContain('points="6 9 12 15 18 9"')
      })
    })
  })

  describe('Given text="Read more" and ariaLabel="Expand job highlights"', () => {
    const props = { text: 'Read more', ariaLabel: 'Expand job highlights' }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(ExpandableButton, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should use the provided aria-label', () => {
        expect(rendered).toContain('aria-label="Expand job highlights"')
      })

      it('And it should NOT use the default aria-label', () => {
        expect(rendered).not.toContain('aria-label="Expand details"')
      })

      it('Then it should render the provided text', () => {
        expect(rendered).toContain('Read more')
      })
    })
  })

  describe('Given text="Show more" and class="job-highlight-btn"', () => {
    const props = { text: 'Show more', class: 'job-highlight-btn' }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(ExpandableButton, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should include the extra class on the button', () => {
        expect(rendered).toContain('job-highlight-btn')
      })

      it('And it should also retain the base expand-btn class', () => {
        expect(rendered).toContain('expand-btn')
      })
    })
  })
})
