import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../../tests/utils.ts'
import Component from './JobHeader.astro'

describe('Testing <JobHeader role:string company:string logoUrl?:string logoAdaptive?:boolean description?:string />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given role="Senior Engineer" and company="Lululemon"', () => {
    const props = {
      role: 'Senior Engineer',
      company: 'Lululemon'
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should contain both role and company name', () => {
        expect(rendered).toContain(props.role)
        expect(rendered).toContain(props.company)
      })
    })
  })

  describe('Given a logoUrl and logoAdaptive=false', () => {
    const props = {
      role: 'Dev',
      company: 'Aesop',
      logoUrl: '/logos/aesop.svg',
      logoAdaptive: false
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should contain an <img> element with the logoUrl', () => {
        expect(rendered).toContain('<img')
        expect(rendered).toContain(`src="${props.logoUrl}"`)
      })

      it('And it should NOT have the adaptive-logo class', () => {
        expect(rendered).not.toContain('adaptive-logo')
      })
    })
  })

  describe('Given a logoUrl and logoAdaptive=true', () => {
    const props = {
      role: 'Dev',
      company: 'Aesop',
      logoUrl: '/logos/aesop.svg',
      logoAdaptive: true
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should contain the adaptive-logo class', () => {
        expect(rendered).toContain('adaptive-logo')
      })

      it('And it should NOT contain an <img> tag', () => {
        expect(rendered).not.toContain('<img')
      })
    })
  })

  describe('Given a description', () => {
    const props = {
      role: 'Dev',
      company: 'Co',
      description: 'A great role at a great company'
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should contain the description text', () => {
        expect(rendered).toContain(props.description)
      })
    })
  })

  describe('Given no description', () => {
    const props = {
      role: 'Dev',
      company: 'Co'
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should NOT contain a job-description paragraph', () => {
        expect(rendered).not.toContain('class="job-description"')
      })
    })
  })
})
