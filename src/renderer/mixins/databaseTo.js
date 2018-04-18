import moment from 'moment'

const toMoment = function (item, key) {
  if (item[key] !== null) {
    item[key] = moment(item[key])
  } else {
    item[key] = null
  }
  return item
}

const toDateDiffToday = function (item, key, by = 'years') {
  if (item[key] === null) {
    item[key] = 0
  } else {
    item[key] = Math.abs(parseInt(item[key].diff(moment(), by)))
  }
  return item
}

const employeeId = function (item) {
  const pad = function (num, size) {
    let string = num
    while (string.length < size) string = '0' + string
    return string
  }
  item['EmployeeId'] = item['Age'].format('YYYYMMDD') + '' + pad(item['Id'], 5)
  return item
}

export { toMoment, toDateDiffToday, employeeId }
