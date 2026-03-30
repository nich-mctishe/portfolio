/**
 * Helper to manage theme toggling and persistence.
 * Exported for unit testing.
 */
export class ThemeManager {
  private element: HTMLElement
  private storage: Storage

  constructor(element: HTMLElement = document.documentElement, storage: Storage = localStorage) {
    this.element = element
    this.storage = storage
  }

  toggleTheme(): string {
    const isDark = this.element.getAttribute('data-theme') === 'dark'
    const newTheme = isDark ? 'light' : 'dark'
    this.setTheme(newTheme)

    return newTheme
  }

  setTheme(theme: string) {
    this.element.setAttribute('data-theme', theme)
    this.storage.setItem('theme', theme)
  }

  initialize() {
    const savedTheme = this.storage.getItem('theme')
    if (savedTheme) {
      this.element.setAttribute('data-theme', savedTheme)
    }
  }
}

export function initializeThemeToggle(documentInstance: Document = document) {
  const themeToggleButton = documentInstance.getElementById('theme-toggle')
  const themeManager = new ThemeManager(documentInstance.documentElement)
  
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      themeManager.toggleTheme()
    })
  }
  
  return themeManager
}
