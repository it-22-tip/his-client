<template>
  <md-table
    v-model="model"
    :md-sort.sync="currentSort"
    :md-sort-order.sync="currentSortOrder"
    :md-sort-fn="customSort"
    class="right-table"
    md-fixed-header>
    <md-table-row
      slot="md-table-row"
      slot-scope="{ item }">
      <md-table-cell
        md-label="Id"
        md-sort-by="Id">{{ item.Id }}</md-table-cell>
      <md-table-cell
        md-label="Nama"
        md-sort-by="Name">{{ item.Name }}</md-table-cell>
      <md-table-cell
        md-label="No Registrasi"
        md-sort-by="LicenseType">{{ item.LicenseType }}<br>{{ item.Number }}</md-table-cell>
      <md-table-cell
        md-label="Berlaku Hingga"
        md-sort-by="DueDateDiffToday">{{ item.DueDateFormated }}</md-table-cell>
        <!-- <md-table-cell>
        <md-button @click="clickEdit(item.Id)" class="md-icon-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="top">Edit</md-tooltip>
        </md-button>
      </md-table-cell> -->
    </md-table-row>
  </md-table>
</template>

<script>
import orm from '@/mixins/orm'
import { map } from 'lodash'
import moment from 'moment'
export default {
  components: {
    'layout-one': () => import('@partials/layout-one')
  },
  mixins: [
    orm
  ],
  data () {
    return {
      model: [],
      connection: null,
      currentSort: 'Name',
      currentSortOrder: 'asc'
    }
  },
  mounted () {
    this.populate()
  },
  beforeDestroy () {
    this.closeConnection()
  },
  methods: {
    clickEdit ($event) {
      console.log($event)
    },
    customSort (value) {
      return value.sort((left, right) => {
        let sortBy = this.currentSort
        const desc = this.currentSortOrder === 'desc'
        let sorted
        if (sortBy === 'Id') {
          sorted = desc
            ? left[sortBy] - right[sortBy]
            : right[sortBy] - left[sortBy]
        } else if (sortBy === 'DueDateDiffToday') {
          sorted = desc
            ? left[sortBy] - right[sortBy]
            : right[sortBy] - left[sortBy]
        } else {
          console.log(sortBy)
          sorted = desc
            ? left[sortBy].localeCompare(right[sortBy])
            : right[sortBy].localeCompare(left[sortBy])
        }
        return sorted
      })
    },
    async closeConnection () {
      if (this.connection !== null && typeof this.connection.close === 'function') {
        try {
          await this.connection.close()
        } finally {
          this.connection = null
        }
      }
    },
    async transaction (transaction) {
      const { Licenses, Persons, Employees, LicenseTypes } = this.connection.models
      let data = await Licenses.findAll({
        transaction: transaction,
        raw: true,
        attributes: ['Id', 'Number', 'DueDate'],
        include: [
          {
            model: Persons,
            attributes: ['Name'],
            include: [
              {
                attributes: ['Id'],
                model: Employees
              }
            ]
          },
          {
            attributes: ['Title'],
            model: LicenseTypes
          }
        ]
      })
      return data
    },
    reAssign (item, from, to, remove = true) {
      item[to] = item[from]
      if (remove) delete item[from]
      return item
    },

    toDate (item, key) {
      if (item[key] !== null) {
        item[key] = item[key].format('D MMMM YYYY')
      }
      return item
    },
    toMoment (item, key) {
      if (item[key] !== null) {
        item[key] = moment(item[key])
      } else {
        item[key] = null
      }
      return item
    },
    toDateDiffToday (item, key, by = 'years') {
      if (item[key] === null) {
        item[key] = 0
      } else {
        item[key] = parseInt(item[key].diff(moment(), by))
      }
      return item
    },
    dataMapper (item) {
      item = this.reAssign(item, 'Person.Name', 'Name')
      item = this.toMoment(item, 'DueDate')
      item = this.reAssign(item, 'DueDate', 'DueDateFormated', false)
      item = this.reAssign(item, 'DueDate', 'DueDateDiffToday', false)
      item = this.reAssign(item, 'LicenseType.Title', 'LicenseType')
      item = this.toDate(item, 'DueDateFormated')
      item = this.toDateDiffToday(item, 'DueDateDiffToday', 'days')
      return item
    },
    async populate () {
      this.connection = (new this.$orm()).withOption({
        username: 'his',
        password: 'his',
        database: 'his'
      }).connect()
      try {
        let data = await this.connection.transaction(this.transaction)
        let model = data.slice()
        this.model = map(model, this.dataMapper)
      } catch (error) {
        console.log(error)
      } finally {
        await this.closeConnection()
      }
    }
  }
}
</script>
