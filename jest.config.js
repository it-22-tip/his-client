module.exports = {
  verbose: false,
  testPathIgnorePatterns: [
    '<rootDir>/src/main/',
    // '<rootDir>/src/renderer/',
    // '<rootDir>/src/vue-material/dev/components/MdCheckbox/',
    // '<rootDir>/src/vue-material/dev/components/MdCard/MdCardMedia/',
    // '<rootDir>/src/vue-material/dev/components/MdBadge/',
    // '<rootDir>/src/vue-material/dev/components/MdRadio/',
    // '<rootDir>/src/vue-material/dev/components/MdSwitch/',
    // '<rootDir>/src/vue-material/dev/components/MdOverlay/',
    // '<rootDir>/src/vue-material/dev/components/MdDrawer/',
    // '<rootDir>/src/vue-material/dev/components/MdPortal/',
    '<rootDir>/external/'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.(vue|js)$',
  'moduleFileExtensions': [
    'js',
    'json',
    'vue'
  ],
  'moduleNameMapper': {
    '^vue$': '<rootDir>/node_modules/vue/dist/vue.common.js',
    '^vue-material(.*)$': '<rootDir>/src/vue-material/dev$1',
    '^test(.*)$': '<rootDir>/test$1',
    '^src(.*)$': '<rootDir>/src$1',
    // '^theme(.*)$': '<rootDir>/src/vue-material/dev/theme$1',
    // '^base(.*)$': '<rootDir>/src/vue-material/dev/base$1',
    '^core/(.*)$': '<rootDir>/src/vue-material/dev/core/$1',
    '^components(.*)$': '<rootDir>/src/vue-material/dev/components$1',
    '\\.(css|scss)$': '<rootDir>/test/styleMock.js',
    '^@partials/(.*)$': '<rootDir>/src/renderer/components/partials/$1',
    '^@extras/(.*)$': '<rootDir>/src/renderer/components/extras/$1',
    '^@mixins/(.*)$': '<rootDir>/src/renderer/mixins/$1'
    // '^@/(.*)$': '<rootDir>/src/renderer/$1'
  },
  'setupTestFrameworkScriptFile': '<rootDir>/test/setup.js',
  'transform': {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  'snapshotSerializers': [
    'jest-serializer-vue'
  ]
}
