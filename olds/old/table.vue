<template>
  <md-table
    v-model="model"
    class="hr-table"
    md-elevation="0"
    md-sort="id"
    md-sort-order="asc"
    md-fixed-header>
    <md-table-toolbar md-elevation="0">
      <md-button @click="clickFilter">Filter</md-button>
    </md-table-toolbar>
    <md-table-row
      slot="md-table-row"
      slot-scope="{ item }"
      :class="item.class">
      <md-table-cell
        md-label="id"
        md-sort-by="id">{{ item.Id }}</md-table-cell>
      <md-table-cell
        md-label="Nama"
        md-sort-by="name">{{ item.Name }}</md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { mapValues, pick, assign, map } from 'lodash'
import { models } from '@/orm'

const toLower = text => {
  return text.toString().toLowerCase()
}

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)))
  }
  return items
}

export default {
  name: 'TableSearch',
  data: () => ({
    search: null,
    model: [],
    users: [],
    selected: [],
    searchtool: null
  }),
  mounted () {
    this.populate()
  },
  methods: {
    dataMapper (item) {
      console.log(item)
      return item
    },
    async closeConnection () {
      if (this.connection !== null && typeof this.connection.close === 'function') {
        console.log('cleaning connection')
        try {
          await this.connection.close()
        } finally {
          this.connection = null
        }
      }
    },
    clickFilter () {

    },
    async transaction (transaction) {
      /* const { Persons, Employees, JobTitles, Licenses, LicenseTypes } = this.connection.models
        console.log(this.connection)
        let data = await Employees.findAll({
          transaction: transaction,
          raw: true,
          attributes: ['Id'],
          where: {
            id: this.employeeId
          },
          include: [
            {
              model: Persons,
              attributes: ['Name', 'Gender', 'BirthDate'],
              include: [
                {
                  model: Licenses,
                  include: [
                    {
                      model: LicenseTypes
                    }
                  ]
                }
              ]
            },
            {
              model: JobTitles,
              attributes: ['Name']
            }
          ]
        })
        return data */
    },
    async populate () {
      this.model = [
        {
          Id: 1,
          Name: 'test'
        }
      ]
      /* this.connection = (new this.$orm).withOption({
          username: 'his',
          password: 'his',
          database: 'his',
        }).connect()
        try {
          let data = await this.connection.transaction(this.transaction)
          //let model = data.slice()
          console.log(data)
          this.model = map(data, this.dataMapper)
        } catch (error) {
          console.log(error)
        } finally {
          await this.closeConnection()
        } */
    }
  }
}
</script>
<style lang="scss">
  .hr-table {
    height: 100% !important;
    display: flex;
    flex-direction: column;
  }
  .hr-table .md-table-toolbar {

  }
  .hr-table .md-table-content {
    display: flex;
    flex: 1;
    overflow-y: scroll !important;
    height: 100% !important;
    max-height: none !important;
  }
  .hr-table .md-table-fixed-header {

  }
</style>
<style lang="scss" scoped>
  table .error {
    background-color: red;
    color: white;
    font-weight: bold;
  }
  table .warning {
    background-color: yellow;
    color: black;
    font-weight: bold;
  }
  .full {

  }
</style>
