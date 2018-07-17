module.exports = {
  verbose: false,
  rootDir: '../',
  testPathIgnorePatterns: [
    '<rootDir>/src/main/',
    '<rootDir>/external/',
    '<rootDir>/src/renderer'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.(vue|js)$',
  // testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.(vue|js)$',
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
    '\\.(css|scss)$': '<rootDir>/test/styleMock.js'
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
