/**
 * Helper to initialize highlights accordions in JobHighlights component.
 * Exported for unit testing and modularity.
 */
export function initiateHighlightAccordions(documentInstance: Document = document) {
  const selector = '.highlights-container[data-expandable="true"]'
  const containers = documentInstance.querySelectorAll(selector)
    
  containers.forEach(container => {
    const expandButton = container.querySelector('.expand-btn')
    const buttonText = container.querySelector('.btn-text')
      
    if (expandButton && buttonText && !container.hasAttribute('data-initialized')) {
      expandButton.addEventListener('click', () => {
        const isExpanded = container.getAttribute('data-expanded') === 'true'
        const newState = !isExpanded
        container.setAttribute('data-expanded', String(newState))
        buttonText.textContent = newState ? 'Show less' : 'View all highlights'
  
        if (isExpanded) {
          // Collapse logic: optionally handle scroll here or via custom events
          container.dispatchEvent(new CustomEvent('highlights-collapsed', {
            detail: { target: container.getAttribute('data-scroll-target') }
          }))
        }
      })
      container.setAttribute('data-initialized', 'true')
    }
  })
}
  
