import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../../tests/utils.ts'
import JobCard from './JobCard.astro'

describe('Testing <JobCard job:object scrollTarget:string />', () => {
  const mockJob = {
    company: 'Lululemon',
    role: 'Senior Engineer',
    description: 'Developed high-performance systems.',
    highlights: ['First highlight', 'Second highlight'],
    skills: ['React', 'TypeScript']
  }
  const scrollTarget = '#job-experience-0'

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given a job with all properties and a scroll target', () => {
    const props = {
      job: mockJob,
      scrollTarget
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(JobCard, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should contain the company and role', () => {
        expect(rendered).toContain(mockJob.company)
        expect(rendered).toContain(mockJob.role)
      })

      it('Then it should contain the job description', () => {
        expect(rendered).toContain(mockJob.description)
      })

      it('Then it should contain all highlights', () => {
        mockJob.highlights.forEach((highlight) => {
          expect(rendered).toContain(highlight)
        })
      })

      it('Then it should contain all skills', () => {
        mockJob.skills.forEach((skill) => {
          expect(rendered).toContain(skill)
        })
      })

      it('Then it should pass the scroll target to sub-components', () => {
        // JobHighlights uses scrollTarget in a data attribute
        expect(rendered).toContain(`data-scroll-target="${scrollTarget}"`)
      })
    })
  })

  describe('Given a job with minimal properties', () => {
    const minimalJob = {
      company: 'Aesop',
      role: 'Engineer'
    }
    const props = {
      job: minimalJob,
      scrollTarget
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(JobCard, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should render company and role', () => {
        expect(rendered).toContain(minimalJob.company)
        expect(rendered).toContain(minimalJob.role)
      })

      it('And it should NOT contain highlights or skills if they are empty', 
        () => {
          expect(rendered).not.toContain('job-highlights')
          expect(rendered).not.toContain('job-skills')
        }
      )
    })
  })
})
