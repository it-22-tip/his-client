import { assign } from 'lodash'
import moment from 'moment'
const scopes = function (models, sequelize) {
  const { Op } = sequelize
  const { Employees, Persons, Licenses, Almamaters } = models
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
    },
    Person_SMA: {
      logging: console.log,
      attributes: [
        // [sequelize.fn('rank', sequelize.col('Person->Almamaters->EducationHistories.GraduationDate')), 'Highest_Education'],
        // sequelize.literal('`Person->Almamaters->EducationHistories`.`GraduationDate` AS `Highest_Education`'),
        'Id'
      ],
      include: [
        {
          model: Persons,
          attributes: ['Name'],
          required: true,
          include: [
            {
              model: Almamaters,
              required: true,
              attributes: ['Name'],
              through: {
                required: true,
                attributes: ['GraduationDate'],
                where: {
                  GraduationDate: null
                }
              }
            }
          ]
        }
      ]
    }
  })
  /* const test = async function () {
    let data
    try {
      data = await Employees.scope('Person_SMA').findAll()
    } catch (e) {
      console.log({error: e})
    }
    data = map(data, i => {
      return i.dataValues
    })
    console.log(data)
  }
  test() */
  return models
}

export default scopes
