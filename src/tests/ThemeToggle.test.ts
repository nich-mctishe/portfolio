import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { readFileSync } from 'fs';

// Helper to manually test the toggle logic since it's an inline script
class ThemeToggleTest {
  btn: HTMLElement | null;

  constructor() {
    this.btn = document.getElementById('theme-toggle');
    if (this.btn) {
      this.btn.addEventListener('click', () => this.toggleTheme());
    }
  }

  toggleTheme() {
    const element = document.documentElement;
    const isDark = element.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    element.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }
}

describe('ThemeToggle JavaScript Logic', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
        <span class="icon-sun">☀️</span>
        <span class="icon-moon">🌙</span>
      </button>
    `;
    
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();
  });
  
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('toggles from unset (light) to dark', () => {
    new ThemeToggleTest();
    const btn = document.getElementById('theme-toggle');
    btn?.click();

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('toggles from dark back to light', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    
    new ThemeToggleTest();
    const btn = document.getElementById('theme-toggle');
    btn?.click();

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
