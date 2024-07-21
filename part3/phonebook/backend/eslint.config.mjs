import js from '@eslint/js'
import globals from 'globals'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  js.configs.recommended,
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: { ...globals.node }, ecmaVersion: 'latest' } },
  {
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      eqeqeq: 'error',
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
  },
  {
    ignores: ['dist/**'],
  },
]
