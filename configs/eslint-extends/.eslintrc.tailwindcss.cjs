/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

/**
 * eslint-plugin-tailwindcss
 *
 * https://github.com/francoismassart/eslint-plugin-tailwindcss
 */
module.exports = {
  plugins: ['tailwindcss'],
  extends: ['plugin:tailwindcss/recommended'],
  rules: {
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-custom-classname': 'off'
  },
  env: {
    node: true
  }
}
