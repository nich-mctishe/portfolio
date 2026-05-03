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

describe('Testing <Skills /> — uses skills entry', () => {
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

  describe('Given a category with nested children', () => {
    const mockData = {
      data: {
        categories: [
          {
            name: 'Languages',
            items: [
              {
                name: 'JavaScript',
                since: 2010,
                active: true,
                children: [
                  { name: 'ES6+', since: 2015, active: true },
                  { name: 'TypeScript', since: 2018, active: false }
                ]
              }
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
      it('Then it should contain the parent skill name', () => {
        expect(rendered).toContain('JavaScript')
      })

      it('And it should contain the active child skill name', () => {
        expect(rendered).toContain('ES6+')
      })

      it('And it should NOT contain the inactive child skill name', () => {
        expect(rendered).not.toContain('TypeScript')
      })
    })
  })

  describe('Given getEntry returns null', () => {
    let rendered: string | null = null

    beforeEach(async () => {
      vi.mocked(getEntry).mockResolvedValue(null)
      rendered = (await render(Component)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should produce a valid HTML string without throwing', () => {
        expect(typeof rendered).toBe('string')
      })
    })
  })
})
