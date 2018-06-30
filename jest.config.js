module.exports = {
  verbose: true,
  testPathIgnorePatterns: [
    '<rootDir>/src/main/',
    '<rootDir>/src/renderer/',
    // '<rootDir>/src/vue-material/',
    '<rootDir>/external/'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(vue|js)$',
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
    '^theme(.*)$': '<rootDir>/src/vue-material/dev/theme$1',
    '^base(.*)$': '<rootDir>/src/vue-material/dev/base$1',
    '^core(.*)$': '<rootDir>/src/vue-material/dev/core$1',
    '^components(.*)$': '<rootDir>/src/vue-material/dev/components$1',
    '\\.(css|scss)$': '<rootDir>/test/styleMock.js'
    // '^@/(.*)$': '<rootDir>/src/renderer/$1'
  },
  'setupTestFrameworkScriptFile': '<rootDir>/test/setup.js',
  'transform': {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.vue$': '<rootDir>/node_modules/vue-jest'
  },
  'snapshotSerializers': [
    '<rootDir>/node_modules/jest-serializer-vue'
  ]
}
