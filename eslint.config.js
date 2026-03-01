import eslintPluginAstro from 'eslint-plugin-astro'
import stylistic from '@stylistic/eslint-plugin'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: ['.astro/**']
  },
  {
    plugins: {
      '@stylistic': stylistic,
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      // Enforce kebab-case file names, except for components and layouts
      'unicorn/filename-case': ['error', {
        case: 'kebabCase',
      }],

      // 2 space tabs
      '@stylistic/indent': ['error', 2],

      // 80 character line limit
      '@stylistic/max-len': ['error', {
        code: 80,
        ignoreUrls: true,
        ignoreComments: true
      }],
      // No semicolons
      '@stylistic/semi': ['error', 'never'],

      // Blank lines padding
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' }
      ],
      // Single quotes
      '@stylistic/quotes': ['error', 'single']
    },
  },
  {
    // Apply PascalCase to astro components and layouts and their virtual scripts
    files: [
      'src/components/**/*.astro',
      'src/components/**/*.astro/*.js',
      'src/components/**/*.astro/*.ts',
      'src/layouts/**/*.astro',
      'src/layouts/**/*.astro/*.js',
      'src/layouts/**/*.astro/*.ts'
    ],
    rules: {
      'unicorn/filename-case': ['error', {
        case: 'pascalCase',
      }],
    },
  },
]
