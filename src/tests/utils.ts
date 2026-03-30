import { experimental_AstroContainer } from 'astro/container'

/**
 * Render an Astro component directly in Node for Vitest/happy-dom.
 */
export async function render(Component: any, props: any = {}) {
  const container = await experimental_AstroContainer.create()
  const html = await container.renderToString(Component, { props })
  
  // Set the rendered HTML into happy-dom's document body
  document.body.innerHTML = html
  
  return {
    html,
    container: document.body
  }
}
