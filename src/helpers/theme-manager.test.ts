import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { ThemeManager } from './theme-manager'

describe('Testing ThemeManager class', () => {
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

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Given the theme is currently light', () => {
    beforeEach(() => {
      element.setAttribute('data-theme', 'light')
    })

    describe('When toggleTheme is called', () => {
      let result: string

      beforeEach(() => {
        result = manager.toggleTheme()
      })

      it('Then it should return "dark"', () => {
        expect(result).toBe('dark')
      })

      it('And it should set the data-theme attribute to "dark"', () => {
        expect(element.getAttribute('data-theme')).toBe('dark')
      })

      it('And it should save "dark" to storage', () => {
        expect(storage.setItem).toHaveBeenCalledWith('theme', 'dark')
      })
    })
  })

  describe('Given the theme is currently dark', () => {
    beforeEach(() => {
      element.setAttribute('data-theme', 'dark')
    })

    describe('When toggleTheme is called', () => {
      let result: string

      beforeEach(() => {
        result = manager.toggleTheme()
      })

      it('Then it should return "light"', () => {
        expect(result).toBe('light')
      })

      it('And it should set the data-theme attribute to "light"', () => {
        expect(element.getAttribute('data-theme')).toBe('light')
      })

      it('And it should save "light" to storage', () => {
        expect(storage.setItem).toHaveBeenCalledWith('theme', 'light')
      })
    })
  })

  describe('Given a saved theme "dark" in storage', () => {
    beforeEach(() => {
      storage.getItem.mockReturnValue('dark')
    })

    describe('When initialize is called', () => {
      beforeEach(() => {
        manager.initialize()
      })

      it('Then it should set the data-theme attribute to "dark"', () => {
        expect(element.getAttribute('data-theme')).toBe('dark')
      })
    })
  })

  describe('Given NO saved theme in storage', () => {
    beforeEach(() => {
      storage.getItem.mockReturnValue(null)
    })

    describe('When initialize is called', () => {
      beforeEach(() => {
        manager.initialize()
      })

      it('Then it should NOT set any data-theme attribute', () => {
        expect(element.hasAttribute('data-theme')).toBe(false)
      })
    })
  })
})
