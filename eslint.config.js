import eslintPluginAstro from 'eslint-plugin-astro'
import stylistic from '@stylistic/eslint-plugin'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import tsParser from '@typescript-eslint/parser'

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: ['.astro/**']
  },
  {
    // Global stylistic rules applied to all JS, TS, and Astro files
    files: ['**/*.js', '**/*.ts', '**/*.astro'],
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/max-len': ['error', {
        code: 80,
        ignoreUrls: true,
        ignoreComments: true
      }],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' }
      ],
    },
  },
  {
    // Use TS parser for .ts files
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
    }
  },
  {
    // Default filename casing: kebab-case
    files: ['**/*.js', '**/*.ts', '**/*.astro'],
    plugins: {
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      'unicorn/filename-case': ['error', {
        case: 'kebabCase',
      }],
    },
  },
  {
    // Override for Astro Components/Layouts and their internal scripts: PascalCase
    files: [
      'src/components/**/*.astro',
      'src/components/**/*.astro/*.js',
      'src/components/**/*.astro/*.ts',
      'src/layouts/**/*.astro',
      'src/layouts/**/*.astro/*.js',
      'src/layouts/**/*.astro/*.ts',
    ],
    rules: {
      'unicorn/filename-case': ['error', {
        case: 'pascalCase',
      }],
    },
  },
]
