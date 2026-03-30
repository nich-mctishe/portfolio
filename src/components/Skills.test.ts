import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../tests/utils.ts'
import Component from './Skills.astro'
import { getEntry } from 'astro:content'

vi.mock('astro:content', () => ({
  getEntry: vi.fn()
}))

vi.mock('../helpers/determine-full-experience-points', () => ({
  determineFullExperiencePoints: vi.fn(() => 10)
}))

describe('Testing <Skills /> — uses astro:content getEntry("skills", "data")', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given a category with one active item', () => {
    const mockData = {
      data: {
        categories: [
          {
            name: 'Frontend',
            items: [
              { name: 'TypeScript', since: 2016, active: true }
            ]
          }
        ]
      }
    }
    let rendered: string | null = null

    beforeEach(async () => {
      vi.mocked(getEntry).mockResolvedValue(mockData as any)
      rendered = (await render(Component)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should contain the category name', () => {
        expect(rendered).toContain('Frontend')
      })

      it('Then it should contain the skill name', () => {
        expect(rendered).toContain('TypeScript')
      })
    })
  })

  describe('Given a category with an inactive item', () => {
    const mockData = {
      data: {
        categories: [
          {
            name: 'Backend',
            items: [
              { name: 'Active Skill', since: 2020, active: true },
              { name: 'Inactive Skill', since: 2020, active: false }
            ]
          }
        ]
      }
    }
    let rendered: string | null = null

    beforeEach(async () => {
      vi.mocked(getEntry).mockResolvedValue(mockData as any)
      rendered = (await render(Component)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should contain the active skill name', () => {
        expect(rendered).toContain('Active Skill')
      })

      it('And it should NOT contain the inactive skill name', () => {
        expect(rendered).not.toContain('Inactive Skill')
      })
    })
  })
})
