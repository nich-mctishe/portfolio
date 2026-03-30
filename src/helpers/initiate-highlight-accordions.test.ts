import { describe, it, expect, beforeEach, vi } from 'vitest'
import { initiateHighlightAccordions } from './initiate-highlight-accordions'

describe('highlights-logic', () => {
  describe('Given a DOM with an expandable highlights container', () => {
    let documentInstance: Document
    let container: HTMLElement
    let expandButton: HTMLButtonElement
    let buttonText: HTMLElement

    beforeEach(() => {
      // Create a mock DOM structure
      documentInstance = document.implementation.createHTMLDocument()
      documentInstance.body.innerHTML = `
        <div 
          class="highlights-container" 
          data-expanded="false" 
          data-expandable="true"
          data-scroll-target="#target"
        >
          <button class="expand-btn">
            <span class="btn-text">View all highlights</span>
          </button>
        </div>
      `
      container = documentInstance.querySelector('.highlights-container') as HTMLElement
      expandButton = documentInstance.querySelector('.expand-btn') as HTMLButtonElement
      buttonText = documentInstance.querySelector('.btn-text') as HTMLElement
    })

    describe('When initiateHighlightAccordions is called', () => {
      beforeEach(() => {
        initiateHighlightAccordions(documentInstance)
      })

      it('Then it should set data-initialized attribute', () => {
        expect(container.hasAttribute('data-initialized')).toBe(true)
      })

      describe('And the expand button is clicked', () => {
        beforeEach(() => {
          expandButton.click()
        })

        it('Then it should set data-expanded to true', () => {
          expect(container.getAttribute('data-expanded')).toBe('true')
        })

        it('Then it should change the button text to "Show less"', () => {
          expect(buttonText.textContent).toBe('Show less')
        })

        describe('When the button is clicked again', () => {
          let eventSpy: any

          beforeEach(() => {
            eventSpy = vi.fn()
            container.addEventListener('highlights-collapsed', eventSpy)
            expandButton.click()
          })

          it('Then it should set data-expanded back to false', () => {
            expect(container.getAttribute('data-expanded')).toBe('false')
          })

          it('Then it should reset the button text', () => {
            expect(buttonText.textContent).toBe('View all highlights')
          })

          it('Then it should dispatch a highlights-collapsed event', () => {
            expect(eventSpy).toHaveBeenCalled()
            const event = eventSpy.mock.calls[0][0]
            expect(event.detail.target).toBe('#target')
          })
        })
      })
    })
  })

  describe('Given a non-expandable container', () => {
    it('Then it should not attach listeners or initialize', () => {
      const documentInstance = document.implementation.createHTMLDocument()
      documentInstance.body.innerHTML = 
        '<div class="highlights-container" data-expandable="false"></div>'
      const container = documentInstance.querySelector('.highlights-container')
      initiateHighlightAccordions(documentInstance)
      expect(container?.hasAttribute('data-initialized')).toBe(false)
    })
  })
})
