import { toUpper, toLower, trim, split, map, slice, join } from 'lodash'

const LowerCase = function (str) {
  return toLower(str)
}

const TitleCase = function (str) {
  str = toLower(str)
  let n = split(str, ' ')
  n = map(n, i => {
    if (i === '') return i
    i = split(i, '')
    let r = toUpper(i[0]) + join(slice(i, 1, i.length), '')
    return r
  })
  return join(n, ' ')
}

const CleanSpace = function (str) {
  return TitleCase(trim(str.replace(/\s+/g, ' ')))
}

export { LowerCase, TitleCase, CleanSpace }
