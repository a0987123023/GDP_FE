/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

/**
 * eslint-plugin-sonarjs
 *
 * https://github.com/SonarSource/eslint-plugin-sonarjs
 */
module.exports = {
  plugins: ['sonarjs'],
  extends: ['plugin:sonarjs/recommended'],
  rules: {
    // https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-duplicate-string.md
    'sonarjs/no-duplicate-string': 'off',
    // https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/cognitive-complexity.md
    'sonarjs/cognitive-complexity': 'off'
  }
}
