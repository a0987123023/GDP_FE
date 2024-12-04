/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

/**
 * eslint-plugin-import
 *
 * https://github.com/import-js/eslint-plugin-import
 */
module.exports = {
  extends: ['plugin:import/recommended', 'plugin:import/typescript'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['element-plus', './node_modules/element-plus']
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      // load <rootDir>/tsconfig.json to eslint
      typescript: {}
    }
  },
  rules: {
    // https://github.com/import-js/eslint-plugin-import
    'import/default': 'warn',
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/export.md
    'import/export': 'warn',
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/named.md
    'import/named': 'warn',
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/namespace.md
    'import/namespace': 'warn',
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md
    'import/no-cycle': 'error',
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md
    'import/no-unresolved': ['error'],
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    'import/order': [
      'warn',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object'
        ]
      }
    ]
  }
}
