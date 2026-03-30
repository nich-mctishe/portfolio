import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '../../tests/utils.ts'
import Component from './JobSkills.astro'

describe('Testing <JobSkills skills?:string[] />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Given skills=["TypeScript", "React", "Node.js"]', () => {
    const props = {
      skills: ['TypeScript', 'React', 'Node.js']
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should contain all three skill strings', () => {
        expect(rendered).toContain('TypeScript')
        expect(rendered).toContain('React')
        expect(rendered).toContain('Node.js')
      })
    })
  })

  describe('Given an empty skills array', () => {
    const props = {
      skills: []
    }
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component, props)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should not contain the skills container', () => {
        expect(rendered).not.toContain('job-skills')
      })
    })
  })

  describe('Given no props (undefined skills)', () => {
    let rendered: string | null = null

    beforeEach(async () => {
      rendered = (await render(Component)).html
    })

    afterEach(() => {
      rendered = null
    })

    describe('When the component is rendered', () => {
      it('Then it should not contain the skills container and not throw', () => {
        expect(rendered).not.toContain('job-skills')
      })
    })
  })
})
