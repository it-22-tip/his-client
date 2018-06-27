module.exports = {
  verbose: true,
  testPathIgnorePatterns: [
    // '<rootDir>/src/vue-material/'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(vue|js)$',
  'moduleFileExtensions': [
    'js',
    'vue'
  ],
  'moduleNameMapper': {
    '^vue$': '<rootDir>/node_modules/vue/dist/vue.common.js',
    '^vue-material(.*)$': '<rootDir>/src/vue-material/dev$1',
    '^test(.*)$': '<rootDir>/test$1'
    // '^src(.*)$': '<rootDir>/src$1',
    // '^theme(.*)$': '<rootDir>/src/theme$1',
    // '^base(.*)$': '<rootDir>/src/base$1',
    // '^core(.*)$': '<rootDir>/src/core$1',
    // '^components(.*)$': '<rootDir>/src/components$1',
    // '\\.(css|scss)$': '<rootDir>/test/styleMock.js'
    // '^@/(.*)$': '<rootDir>/src/renderer/$1'
  },
  'transform': {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  'snapshotSerializers': [
    '<rootDir>/node_modules/jest-serializer-vue'
  ]
}
