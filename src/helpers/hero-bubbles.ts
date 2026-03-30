/**
 * Helper to initialize background bubbles in Hero component.
 * Exported for unit testing and modularity.
 */
export function initializeHeroBubbles(container: HTMLElement) {
  if (!container) return
  
  const bubbleCount = 4
  const colors = [
    'var(--color-secondary)',
    'var(--color-tertiary)',
    'var(--color-quaternary)'
  ]
  
  // Clear existing bubbles if any (for soft navigations)
  container.innerHTML = ''

  // Corners to ensure spread (top-left, top-right, bottom-left, bottom-right)
  const defaultCorners = [
    { vertical: 'top', horizontal: 'left' },
    { vertical: 'top', horizontal: 'right' },
    { vertical: 'bottom', horizontal: 'left' },
    { vertical: 'bottom', horizontal: 'right' },
  ]
  
  // Shuffled corners for non-VRT randomized spread
  const shuffledCorners = [...defaultCorners].sort(() => Math.random() - 0.5)

  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div')
    bubble.className = 'bubble'
    
    // Check if we are in VRT mode for deterministic results
    const isVrt = (window as any).__VRT__ === true

    // Distribution: pick a corner
    const corner = isVrt ? defaultCorners[i % 4] : shuffledCorners[i % 4]
    
    // Random values for safe interior within the quadrant (from 2% to 15%)
    const vVal = isVrt ? `${5 + (i * 3) % 10}%` : `${Math.floor(Math.random() * 13) + 2}%`
    const hVal = isVrt ? `${5 + (i * 7) % 10}%` : `${Math.floor(Math.random() * 13) + 2}%`

    // Measurements
    const size = isVrt ? '40px' : Math.floor(Math.random() * 8 + 4) + 'rem'
    const color = colors[isVrt ? i % colors.length : Math.floor(Math.random() * colors.length)]
    const speed = isVrt ? '15s' : `${Math.random() * 10 + 10}s`
    const delay = isVrt ? `${i * 0.5}s` : `${Math.random() * 5}s`
    
    // Movement Randomization (using --float-x1, --float-y1, etc.)
    // VRT uses fixed offsets to ensure stability
    const x1 = isVrt ? '2rem' : `${(Math.random() * 3) + 1}rem`
    const y1 = isVrt ? '-2rem' : `${-(Math.random() * 3) - 1}rem`
    const r1 = isVrt ? '5deg' : `${(Math.random() * 10) - 5}deg`
    
    const x2 = isVrt ? '-1.5rem' : `${-(Math.random() * 3) - 1}rem`
    const y2 = isVrt ? '2rem' : `${(Math.random() * 3) + 1}rem`
    const r2 = isVrt ? '-5deg' : `${-(Math.random() * 10) + 5}deg`

    // Use CSS variables for design token overrides in Hero.astro
    bubble.style.setProperty('--size', size)
    bubble.style.setProperty('--color', color)
    bubble.style.setProperty('--speed', speed)
    bubble.style.setProperty('--delay', delay)

    // Animation variables
    bubble.style.setProperty('--float-x1', x1)
    bubble.style.setProperty('--float-y1', y1)
    bubble.style.setProperty('--float-r1', r1)
    bubble.style.setProperty('--float-x2', x2)
    bubble.style.setProperty('--float-y2', y2)
    bubble.style.setProperty('--float-r2', r2)

    // Reset default positioning from class (if any) and apply specified corner
    bubble.style.top = 'auto'
    bubble.style.bottom = 'auto'
    bubble.style.left = 'auto'
    bubble.style.right = 'auto'

    bubble.style.setProperty(corner.vertical, vVal)
    bubble.style.setProperty(corner.horizontal, hVal)
  
    container.appendChild(bubble)
  }
}
