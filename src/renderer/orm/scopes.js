import { assign } from 'lodash'
import moment from 'moment'
const scopes = function (models, sequelize) {
  const { Op } = sequelize
  const { Employees, Persons, Licenses } = models
  Employees.options.scopes = assign({}, {
    Person_L: {
      include: [
        {
          model: Persons,
          where: {
            Gender: 'L'
          }
        }
      ]
    },
    Person_P: {
      logging: console.log,
      include: [
        {
          model: Persons,
          where: {
            Gender: 'P'
          }
        }
      ]
    },
    Person_Islam: {
      logging: console.log,
      include: [
        {
          model: Persons,
          where: {
            Faith: 'Islam'
          }
        }
      ]
    },
    License_D: {
      logging: console.log,
      include: [
        {
          model: Persons,
          required: true,
          include: [
            {
              model: Licenses,
              required: true,
              where: {
                DueDate: {
                  [Op.not]: null,
                  [Op.gt]: moment().add(22, 'month').toDate()
                }
              }
            }
          ]
        }
      ]
    }
  })
  const test = async function () {
    let data
    try {
      data = await Employees.scope('License_D').findAll()
    } catch (e) {
      console.log(e)
    }
    console.log(data)
  }
  test()
  return models
}

export default scopes
