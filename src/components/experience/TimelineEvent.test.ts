import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../../tests/utils.ts'
import Component from './TimelineEvent.astro'

describe('Testing <TimelineEvent startDate:string endDate?:string location?:string />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given startDate="Jan 2020" and no endDate', () => {
    const props = {
      startDate: 'Jan 2020'
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should contain "Present"', () => {
        expect(rendered).toContain('Present')
      })
    })
  })

  describe('Given startDate="Jan 2020" and endDate="Dec 2023"', () => {
    const props = {
      startDate: 'Jan 2020',
      endDate: 'Dec 2023'
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should contain "Dec 2023"', () => {
        expect(rendered).toContain('Dec 2023')
      })

      it('And it should NOT contain "Present"', () => {
        expect(rendered).not.toContain('Present')
      })
    })
  })

  describe('Given a location', () => {
    const props = {
      startDate: 'Jan 2020',
      location: 'Vancouver, BC'
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should contain the location text', () => {
        expect(rendered).toContain(props.location)
      })
    })
  })

  describe('Given no location', () => {
    const props = {
      startDate: 'Jan 2020'
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should NOT contain a job-location element', () => {
        expect(rendered).not.toContain('class="job-location"')
      })
    })
  })
})
