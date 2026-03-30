import { describe, it, expect, vi, beforeEach } from 'vitest'
import { determineFullExperiencePoints } from './determine-full-experience-points'
import type { SkillItem } from '../content/config'

vi.mock('./calculate-skill-duration', () => {
  return {
    calculateSkillDuration: vi.fn((since: number, end?: number) => {
      const currentYear = 2026

      return end ? end - since : currentYear - since
    })
  }
})

describe('Testing determineFullExperiencePoints(skills: SkillItem[])', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given an empty skills array', () => {
    const skills: SkillItem[] = []
    let result: number | null = null

    beforeEach(() => {
      result = determineFullExperiencePoints(skills)
    })

    describe('When called', () => {
      it('Then it should return 0', () => {
        expect(result).toBe(0)
      })
    })
  })

  describe('Given a flat list of skills with known durations', () => {
    const skills: SkillItem[] = [
      { name: 'Skill A', since: 2020, active: true }, // duration: 2026 - 2020 = 6
      { name: 'Skill B', since: 2015, active: true }  // duration: 2026 - 2015 = 11
    ]
    let result: number | null = null

    beforeEach(() => {
      result = determineFullExperiencePoints(skills)
    })

    describe('When called', () => {
      it('Then it should return the maximum duration (11)', () => {
        expect(result).toBe(11)
      })
    })
  })

  describe('Given nested skills with deeper children having higher durations', () => {
    const skills: SkillItem[] = [
      {
        name: 'Parent',
        since: 2025, // duration: 1
        active: true,
        children: [
          { name: 'Child', since: 2010, active: true } // duration: 16
        ]
      }
    ]
    let result: number | null = null

    beforeEach(() => {
      result = determineFullExperiencePoints(skills)
    })

    describe('When called', () => {
      it('Then it should return the maximum duration from the entire tree (16)', () => {
        expect(result).toBe(16)
      })
    })
  })
})
