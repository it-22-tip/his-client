module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:vue/recommended',
    'plugin:jest/recommended'
  ],
  globals: {
    __static: true,
    'jest/globals': true
  },
  plugins: [
    'promise',
    'jest',
    'flowtype-errors'
  ],
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // flow
    'flowtype-errors/show-errors': 2,
    'flowtype-errors/show-warnings': 1
  }
}
