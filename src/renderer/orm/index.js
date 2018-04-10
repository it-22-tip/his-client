'use-strict'
import Sequelize from 'sequelize'
import { default as defaultOptions } from './options'
import { default as definitions } from './definitions'
import { extend, isEmpty } from 'lodash'
import associations from './associations'

const Orm = function () {
  this.options = defaultOptions
  this.sequelize = null
  this.models = []
}

Orm.prototype.withOption = function (options) {
  this.options = extend({}, defaultOptions, this.options, options)
  return this
}

Orm.prototype.defineModels = function () {
  let sequelize = this.sequelize
  for (let definition of definitions) {
    const {tableName, attributes, options} = definition
    this.models.push(sequelize.define(tableName, attributes, options))
  }
  return this
}

Orm.prototype.withoutDatabase = function () {
  this.withOption({ database: null })
}

Orm.prototype.associate = function () {
  associations(this.sequelize.models)
  return this
}

Orm.prototype.recursive = function () {
  let models = this.list
  let atur = []

  const mapper = function (list) {
    for (let model of list) {
      let association = model.associations
      let current = model.tableName
      if (isEmpty(association)) continue

      for (let item in association) {
        item = association[item]
        let type = item.associationType
        if (type !== 'BelongsTo') {
          atur.push(item.target)
          continue
        }
        // console.log(association[association_item])
        const target = item.target.tableName
        console.log(current + ' BelongsTo ' + target)
      }
    }
  }
  mapper(models)
  // console.log(atur)
}

Orm.prototype.connect = function () {
  this.sequelize = new Sequelize(this.options)
  this.defineModels()
  this.associate()
  this.sequelize.list = this.models
  return this.sequelize
}

export default Orm
