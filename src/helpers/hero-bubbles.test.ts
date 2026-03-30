import { describe, it, expect, beforeEach } from 'vitest'
import { initializeHeroBubbles } from './hero-bubbles'

describe('bubble-logic', () => {
  describe('Given a container element', () => {
    let container: HTMLElement

    beforeEach(() => {
      container = document.createElement('div')
    })

    describe('When initializeHeroBubbles is called', () => {
      beforeEach(() => {
        initializeHeroBubbles(container)
      })

      it('Then it should create 4 bubbles', () => {
        expect(container.querySelectorAll('.bubble').length).toBe(4)
      })

      it('Then each bubble should have CSS custom properties assigned', () => {
        const bubble = container.querySelector('.bubble') as HTMLElement
        expect(bubble.style.getPropertyValue('--size')).toBeTruthy()
        expect(bubble.style.getPropertyValue('--color')).toBeTruthy()
        expect(bubble.style.getPropertyValue('--speed')).toBeTruthy()
      })
    })
  })
})
