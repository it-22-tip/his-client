'use-strict'
import Sequelize from 'sequelize'
import { default as defaultOptions } from './options'
import { default as definitions } from './definitions'
import { extend, isEmpty } from 'lodash'
import associations from './associations'
import scopes from './scopes'

class Orm {
  constructor () {
    this.options = defaultOptions
    this.sequelize = null
    this.models = []
  }

  withOption (options) {
    this.options = extend({}, defaultOptions, this.options, options)
    return this
  }

  defineModels () {
    let sequelize = this.sequelize
    for (let definition of definitions) {
      const {tableName, attributes, options} = definition
      this.models.push(sequelize.define(tableName, attributes, options))
    }
    return this
  }

  withoutDatabase () {
    this.withOption({ database: null })
  }

  associate () {
    associations(this.sequelize.models)
    return this
  }

  scope () {
    scopes(this.sequelize.models, this.sequelize)
    return this
  }

  recursive () {
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

  connect () {
    this.sequelize = new Sequelize(this.options)
    this.defineModels()
    this.associate()
    this.scope()
    this.sequelize.list = this.models
    return this.sequelize
  }
}

export default Orm
