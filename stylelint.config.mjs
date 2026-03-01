export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-html/astro'
  ],
  ignoreFiles: ['dist/**'],
  rules: {
    'color-hex-length': 'long',
    'selector-class-pattern': null,
    'scss/dollar-variable-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
  overrides: [
    {
      files: [
        'src/components/**/*.astro',
        'src/layouts/**/*.astro',
        'src/pages/**/*.astro',
        'src/styles/global.scss'
      ],
      rules: {
        'unit-disallowed-list': ['px'],
        'color-named': 'never',
      }
    }
  ]
}
