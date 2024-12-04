/* eslint-env node */
module.exports = {
  root: true,
  plugins: ['unused-imports'],
  extends: ['../../.eslintrc.cjs'],
  rules: {
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ]
  }
}
