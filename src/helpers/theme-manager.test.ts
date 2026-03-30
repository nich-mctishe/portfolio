import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ThemeManager } from './theme-manager'

describe('ThemeManager', () => {
  let element: HTMLElement
  let storage: any
  let manager: ThemeManager

  beforeEach(() => {
    element = document.createElement('html')
    storage = {
      getItem: vi.fn(),
      setItem: vi.fn()
    }
    manager = new ThemeManager(element, storage)
  })

  describe('When toggleTheme is called', () => {
    it('Then it should switch from light to dark', () => {
      element.setAttribute('data-theme', 'light')
      const result = manager.toggleTheme()
      expect(result).toBe('dark')
      expect(element.getAttribute('data-theme')).toBe('dark')
      expect(storage.setItem).toHaveBeenCalledWith('theme', 'dark')
    })

    it('Then it should switch from dark to light', () => {
      element.setAttribute('data-theme', 'dark')
      const result = manager.toggleTheme()
      expect(result).toBe('light')
      expect(element.getAttribute('data-theme')).toBe('light')
      expect(storage.setItem).toHaveBeenCalledWith('theme', 'light')
    })
  })

  describe('When initialize is called', () => {
    it('Then it should load the saved theme from storage', () => {
      storage.getItem.mockReturnValue('dark')
      manager.initialize()
      expect(element.getAttribute('data-theme')).toBe('dark')
    })

    it('Then it should do nothing if no theme is saved', () => {
      storage.getItem.mockReturnValue(null)
      manager.initialize()
      expect(element.hasAttribute('data-theme')).toBe(false)
    })
  })
})
