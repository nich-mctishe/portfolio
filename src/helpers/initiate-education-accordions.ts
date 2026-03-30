/**
 * Helper to initialize education accordions.
 * Exported for unit testing.
 */
export function initiateEducationAccordions(documentInstance: Document = document) {
  const selector = '.education-card[data-expandable="true"]'
  const cards = documentInstance.querySelectorAll(selector)

  cards.forEach(card => {
    const expandButton = card.querySelector('.expand-btn')

    if (expandButton && !card.hasAttribute('data-initialized')) {
      expandButton.addEventListener('click', () => {
        const isExpanded = card.getAttribute('data-expanded') === 'true'
        const newState = !isExpanded
        card.setAttribute('data-expanded', String(newState))
          
        const buttonText = expandButton.querySelector('.btn-text')
        
        if (buttonText) {
          buttonText.textContent = newState ? 'Hide synopsis' : 'View synopsis'
        }
      })
      card.setAttribute('data-initialized', 'true')
    }
  })
}
  
