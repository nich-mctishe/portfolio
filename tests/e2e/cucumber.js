export default {
  import: ['tests/e2e/steps/**/*.ts', 'tests/e2e/support/**/*.ts'],
  paths: ['tests/e2e/features/**/*.feature'],
  formatOptions: {
    snippetInterface: 'async-await'
  }
}
