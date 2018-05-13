import moment from 'moment'

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
  item['EmployeeId'] = moment(item['BirthDate']).format('YYYYMMDD') + '' + pad(item['Id'], 5)
  return item
}

export { toDateDiffToday, employeeId }
