/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  plugins: ['html'],
  extends: [
    /**
     * unplugin-auto-import eslint setting
     *
     * https://github.com/antfu/unplugin-auto-import#eslint
     */
    './.eslintrc-auto-import.json',
    'eslint:recommended',
    './configs/eslint-extends/.eslintrc.import.cjs',
    './configs/eslint-extends/.eslintrc.sonarjs.cjs',
    './configs/eslint-extends/.eslintrc.unicorn.cjs',
    './configs/eslint-extends/.eslintrc.vue.cjs',
    './configs/eslint-extends/.eslintrc.tailwindcss.cjs'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // https://eslint.org/docs/latest/rules/camelcase
    camelcase: ['error', { properties: 'never' }],

    // https://eslint.org/docs/latest/rules/eqeqeq
    eqeqeq: ['error', 'always', { null: 'ignore' }],

    // https://eslint.org/docs/latest/rules/no-unmodified-loop-condition
    'no-unmodified-loop-condition': 'error',

    // https://eslint.org/docs/latest/rules/no-var
    'no-var': 'error',

    // https://eslint.org/docs/latest/rules/prefer-const
    'prefer-const': 'warn',

    // 允許解構後變數未使用 https://eslint.org/docs/latest/rules/no-unused-vars#ignorerestsiblings
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],

    // 禁止沒有 await 表達式的非同步函數 https://eslint.org/docs/latest/rules/require-await
    'require-await': 'warn'
  }
}
