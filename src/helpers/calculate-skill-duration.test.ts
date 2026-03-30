import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { calculateSkillDuration } from './calculate-skill-duration'

describe('Testing calculateSkillDuration(since: number, end?: number)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-06-01T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Given since=2010 and end=2015', () => {
    const since = 2010
    const end = 2015
    let result: number | null = null

    beforeEach(() => {
      result = calculateSkillDuration(since, end)
    })

    afterEach(() => {
      result = null
    })

    describe('When called', () => {
      it('Then it should return 5', () => {
        expect(result).toBe(5)
      })
    })
  })

  describe('Given since=2020 and no end year (system date mocked to 2026)', () => {
    const since = 2020
    let result: number | null = null

    beforeEach(() => {
      result = calculateSkillDuration(since)
    })

    afterEach(() => {
      result = null
    })

    describe('When called', () => {
      it('Then it should return 6', () => {
        expect(result).toBe(6)
      })
    })
  })

  describe('Given since=2026 (start year equals current year)', () => {
    const since = 2026
    let result: number | null = null

    beforeEach(() => {
      result = calculateSkillDuration(since)
    })

    afterEach(() => {
      result = null
    })

    describe('When called', () => {
      it('Then it should return 1 (minimum floor)', () => {
        expect(result).toBe(1)
      })
    })
  })

  describe('Given since=2020 and end=2020 (start year equals end year)', () => {
    const since = 2020
    const end = 2020
    let result: number | null = null

    beforeEach(() => {
      result = calculateSkillDuration(since, end)
    })

    afterEach(() => {
      result = null
    })

    describe('When called', () => {
      it('Then it should return 1 (minimum floor)', () => {
        expect(result).toBe(1)
      })
    })
  })
})
