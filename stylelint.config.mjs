export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-html/astro'
  ],
  rules: {
    'color-hex-length': 'long',
    'selector-class-pattern': null, // Disable strict class name patterns if you want freedom with custom CSS
    'scss/dollar-variable-pattern': null, // Disable strict variable patterns
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
        // Enforce rems over px (except for very specific borders if needed)
        // Use /* stylelint-disable-next-line unit-disallowed-list */ 
        // for exceptions
        'unit-disallowed-list': ['px'],

        // Disallow direct colors so components MUST use var(--color-...)
        'color-no-hex': true,
        'color-named': 'never',
        'function-disallowed-list': ['rgb', 'rgba', 'hsl', 'hsla'],
      }
    }
  ]
}
