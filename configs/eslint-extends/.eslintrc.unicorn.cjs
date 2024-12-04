/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

/**
 * eslint-plugin-unicorn
 *
 * https://github.com/sindresorhus/eslint-plugin-unicorn
 */
module.exports = {
  plugins: ['unicorn'],
  rules: {
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase'
      }
    ]
  }
}
