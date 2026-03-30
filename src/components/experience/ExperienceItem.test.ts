import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../../tests/utils.ts'
import ExperienceItem from './ExperienceItem.astro'

describe('Testing <ExperienceItem job:object index:number />', () => {
  const mockJob = {
    company: 'Lululemon',
    role: 'Senior Engineer',
    startDate: '2020-01-01',
    endDate: 'Present',
    location: 'Vancouver',
    description: 'Developed high-performance systems.',
    highlights: ['First highlight'],
    skills: ['Astro']
  }
  const index = 1
  const expectedId = `job-experience-${index}`

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given a job with all properties and index 1', () => {
    const props = {
      job: mockJob,
      index
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(ExperienceItem, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should have the correct ID on the container', () => {
        expect(rendered).toContain(`id="${expectedId}"`)
      })

      it('Then it should render TimelineEvent with the correct details', () => {
        expect(rendered).toContain(mockJob.startDate)
        expect(rendered).toContain(mockJob.endDate)
        expect(rendered).toContain(mockJob.location)
      })

      it('Then it should render JobCard with job details', () => {
        expect(rendered).toContain(mockJob.company)
        expect(rendered).toContain(mockJob.role)
        expect(rendered).toContain(mockJob.description)
      })

      it('And JobCard\'s JobHighlights should use the correct scroll target', 
        () => {
          expect(rendered).toContain(`data-scroll-target="#${expectedId}"`)
        }
      )
    })
  })

  describe('Given a minimal job and index 0', () => {
    const minimalJob = {
      company: 'Aesop',
      role: 'Dev',
      startDate: '2015-05-01'
    }
    const props = {
      job: minimalJob,
      index: 0
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(ExperienceItem, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should have the correct ID on the container (index 0)', () => {
        expect(rendered).toContain('id="job-experience-0"')
      })

      it('And it should render company and role', () => {
        expect(rendered).toContain(minimalJob.company)
        expect(rendered).toContain(minimalJob.role)
      })
    })
  })
})
