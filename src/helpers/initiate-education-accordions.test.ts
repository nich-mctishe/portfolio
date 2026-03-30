import { describe, it, expect, beforeEach, vi } from 'vitest'
import { initiateEducationAccordions } from './initiate-education-accordions'

describe('education-logic', () => {
  describe('Given a DOM with an expandable education card', () => {
    let documentInstance: Document
    let container: HTMLElement
    let expandButton: HTMLButtonElement
    let buttonText: HTMLElement

    beforeEach(() => {
      documentInstance = document.implementation.createHTMLDocument()
      documentInstance.body.innerHTML = `
        <div class="education-card" 
          data-expandable="true" 
          data-expanded="false"
        >
          <button class="expand-btn">
            <span class="btn-text">View synopsis</span>
          </button>
        </div>
      `
      container = documentInstance.querySelector('.education-card') as HTMLElement
      expandButton = documentInstance.querySelector('.expand-btn') as HTMLButtonElement
      buttonText = documentInstance.querySelector('.btn-text') as HTMLElement
    })

    describe('When initiateEducationAccordions is called', () => {
      beforeEach(() => {
        initiateEducationAccordions(documentInstance)
      })

      it('Then it should set data-initialized', () => {
        expect(container.hasAttribute('data-initialized')).toBe(true)
      })

      describe('And the expand button is clicked', () => {
        beforeEach(() => {
          expandButton.click()
        })

        it('Then it should set data-expanded to true', () => {
          expect(container.getAttribute('data-expanded')).toBe('true')
        })

        it('Then it should change the button text to "Hide synopsis"', () => {
          expect(buttonText.textContent).toBe('Hide synopsis')
        })

        describe('When the button is clicked again', () => {
          beforeEach(() => {
            expandButton.click()
          })

          it('Then it should set data-expanded back to false', () => {
            expect(container.getAttribute('data-expanded')).toBe('false')
          })

          it('Then it should reset the button text', () => {
            expect(buttonText.textContent).toBe('View synopsis')
          })
        })
      })
    })
  })
})
