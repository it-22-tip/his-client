import { readAsArrayBuffer } from './files'
import expect from 'expect'

test('readAsArrayBuffer', () => {
  expect(() => { readAsArrayBuffer('./test.js') }).toThrow(TypeError)
})
