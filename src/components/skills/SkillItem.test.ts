import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../../tests/utils.ts'
import SkillItem from './SkillItem.astro'

describe('Testing <SkillItem name:string since:number end?:number fullExperiencePoints:number isChild?:boolean />', () => {
  const mockSkill = {
    name: 'TypeScript',
    since: 2020,
    fullExperiencePoints: 10
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-06-01T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Given a skill with name "TypeScript" and since 2020', () => {
    const props = {
      ...mockSkill
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(SkillItem, props)).html
    })

    describe('When the component is rendered', () => {
      it('Then it should contain the skill name', () => {
        expect(rendered).toContain(mockSkill.name)
      })

      it('Then it should calculate and display the duration label "4 Yrs"', () => {
        // From 2020 to 2024 (fake time set above) is 4 full years
        expect(rendered).toContain('4 Yrs')
      })

      it('Then it should render desktop bar segments with --total: 10 and --filled: 4', () => {
        expect(rendered).toContain('--total: 10')
        expect(rendered).toContain('--filled: 4')
      })

      it('Then it should render mobile bar segments with --total: 10 and --filled: 4', () => {
        // (4/10) * 10 = 10 (Wait! 4/10 * 10 = 4)
        expect(rendered).toContain('--total: 10')
        // Check for presence in the style attribute
        expect(rendered).toMatch(/--filled: 4/i)
      })
    })
  })

  describe('Given a skill that is a child component', () => {
    const props = {
      ...mockSkill,
      isChild: true
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(SkillItem, props)).html
    })

    describe('When the component is rendered', () => {
      it('Then it should have the "is-child" CSS class', () => {
        expect(rendered).toContain('skill-item is-child')
      })
    })
  })

  describe('Given a skill with an end year', () => {
    const props = {
      ...mockSkill,
      since: 2018,
      end: 2020
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(SkillItem, props)).html
    })

    describe('When the component is rendered', () => {
      it('Then it should calculate the duration as 2 years', () => {
        expect(rendered).toContain('2 Yrs')
      })
    })
  })
})
