import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../tests/utils.ts'
import Component from './BaseLayout.astro'
import { getEntry } from 'astro:content'

vi.mock('astro:content', () => ({
  getEntry: vi.fn()
}))

describe('Testing <BaseLayout title:string description?:string />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given title="Nicholas Headlong — Portfolio"', () => {
    const props = {
      title: 'Nicholas Headlong — Portfolio'
    }
    const mockPersonal = {
      data: {
        name: 'Nicholas Headlong',
        title: 'Solution Architect & Engineer',
        description: 'First line.\nSecond line.',
        socials: []
      }
    }
    let rendered: string | null = null

    beforeEach(async () => {
      vi.mocked(getEntry).mockResolvedValue(mockPersonal as any)
      rendered = (await render(Component, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the layout is rendered', () => {
      it('Then the HTML <title> tag should contain the prompt title', () => {
        expect(rendered).toContain(`<title>${props.title}</title>`)
      })

      it('And it should fall back to the first line of personal description for meta tag', () => {
        expect(rendered).toContain('content="First line."')
      })

      it('And it should contain the JSON-LD script', () => {
        expect(rendered).toContain('type="application/ld+json"')
      })

      it('And it should contain the name from personal data in JSON-LD', () => {
        expect(rendered).toContain('"name":"Nicholas Headlong"')
      })
    })
  })

  describe('Given a custom description prop', () => {
    const props = {
      title: 'Title',
      description: 'Custom meta description'
    }
    let rendered: string | null = null

    beforeEach(async () => {
      vi.mocked(getEntry).mockResolvedValue({ 
        data: { 
          name: 'Nicholas',
          title: 'Architect',
          description: 'Fallback',
          socials: []
        } 
      } as any)
      rendered = (await render(Component, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the layout is rendered', () => {
      it('Then the <meta name="description"> content should equal the prop value', () => {
        expect(rendered).toContain('content="Custom meta description"')
      })
    })
  })
})
