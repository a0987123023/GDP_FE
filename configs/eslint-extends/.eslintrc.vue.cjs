/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

/**
 * eslint-plugin-import
 *
 * https://github.com/import-js/eslint-plugin-import
 */
module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-prettier',
    '@vue/eslint-config-typescript',
    'plugin:vue-scoped-css/vue3-recommended'
  ],
  rules: {
    // https://typescript-eslint.io/rules/array-type
    '@typescript-eslint/array-type': 'warn',

    // https://typescript-eslint.io/rules/consistent-type-imports
    '@typescript-eslint/consistent-type-imports': 'error',

    // https://typescript-eslint.io/rules/no-unused-vars
    '@typescript-eslint/no-unused-vars': 'warn',

    // https://eslint.org/docs/latest/rules/no-unused-vars
    'no-unused-vars': 'off',

    // https://eslint.vuejs.org/rules/attributes-order.html
    'vue/attributes-order': [
      'warn',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'ATTR_DYNAMIC',
          'ATTR_STATIC',
          'ATTR_SHORTHAND_BOOL',
          'EVENTS',
          'CONTENT'
        ],
        alphabetical: true
      }
    ],

    // https://eslint.vuejs.org/rules/block-lang.html
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: 'ts'
        },
        style: {
          lang: 'scss'
        }
      }
    ],

    // https://eslint.vuejs.org/rules/camelcase.html
    'vue/camelcase': ['error', { properties: 'never' }],

    // https://eslint.vuejs.org/rules/component-definition-name-casing.html
    'vue/component-definition-name-casing': ['error' | 'kebab-case'],

    // https://eslint.vuejs.org/rules/component-name-in-template-casing.html
    'vue/component-name-in-template-casing': [
      'warn',
      'kebab-case',
      {
        registeredComponentsOnly: false,
        ignores: []
      }
    ],

    // https://eslint.vuejs.org/rules/component-tags-order.html
    'vue/component-tags-order': [
      'warn',
      {
        order: ['script', 'template', 'style']
      }
    ],

    // https://eslint.vuejs.org/rules/eqeqeq.html
    'vue/eqeqeq': ['error', 'always', { null: 'ignore' }],

    // https://eslint.vuejs.org/rules/html-self-closing.html
    'vue/html-self-closing': [
      'warn',
      { html: { normal: 'never', void: 'always' } }
    ],

    // https://eslint.vuejs.org/rules/multi-word-component-names.html
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index', 'detail']
      }
    ],

    // https://eslint.vuejs.org/rules/order-in-components.html
    'vue/order-in-components': 'error',

    // https://eslint.vuejs.org/rules/require-prop-types.html
    'vue/require-prop-types': 'error',

    //https://eslint.vuejs.org/rules/v-on-event-hyphenation.html
    'vue/v-on-event-hyphenation': [
      'warn',
      'always',
      {
        autofix: true
      }
    ],

    // https://future-architect.github.io/eslint-plugin-vue-scoped-css/rules/enforce-style-type.html
    'vue-scoped-css/enforce-style-type': 'error',

    // https://future-architect.github.io/eslint-plugin-vue-scoped-css/rules/no-unused-selector.html
    'vue-scoped-css/no-unused-selector': 'off',

    // https://future-architect.github.io/eslint-plugin-vue-scoped-css/rules/require-v-deep-argument.html
    'vue-scoped-css/require-v-deep-argument': 'off',

    // https://eslint.vuejs.org/rules/no-dupe-keys.html
    'vue/no-dupe-keys': ['warn']
  }
}
