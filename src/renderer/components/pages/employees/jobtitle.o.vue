<template>
  <md-table
    v-model="model"
    :md-sort.sync="currentSort"
    :md-sort-order.sync="currentSortOrder"
    :md-sort-fn="customSort"
    md-fixed-header>
    <md-table-row slot="md-table-row" slot-scope="{ item }">
      <md-table-cell md-label="No" md-sort-by="Id">{{ item.Id }}</md-table-cell>
      <md-table-cell md-label="Nama" md-sort-by="Name">{{ item.Name }}</md-table-cell>
      <md-table-cell md-label="Jumlah" md-sort-by="Count">{{ item.Count }}</md-table-cell>
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
import orm from '@mixins/orm'
import { map, groupBy, toPairs } from 'lodash'
import moment from 'moment'
export default {
  mixins: [
    orm
  ],
  components: {
    'layout-one': () => import('@partials/layout-one')
  },
  data () {
    return {
      searched: [],
      model: [],
      reset: [],
      connection: null,
      currentSort: 'Name',
      currentSortOrder: 'asc',
      searchText: '',
      searchBy: 'Name'
    }
  },
  mounted () {
    this.populate()
  },
  beforeDestroy () {

  },
  methods: {
    clickEdit($event) {
      this.$router.push({ name: 'employees.jobtitle.detail', params: { jobtitleId: $event } })
    },
    clickSearch () {
      const toLower = text => {
          return text.toString().toLowerCase()
      }
      let s
      if (this.reset.length < 1) {
        this.reset = this.model.splice()
        // console.log(this.reset)
      } else {
        this.model = this.reset
      }
      try {
      s = this.model.filter(item => toLower(item.Name).includes(toLower(this.searchText)))
      } catch (error) {
        console.log(error)
      }
      // console.log(this.reset)
      this.model = s
    },
    customSort (value) {
      return value.sort((left, right) => {
        const sortBy = this.currentSort
        const desc = this.currentSortOrder === 'desc'
        let sorted
        if (sortBy === 'Id' || sortBy === 'Age' ) {
          sorted = desc ?
          left[sortBy] - right[sortBy] :
          right[sortBy] - left[sortBy]
        } else {
          sorted = desc ?
          left[sortBy].localeCompare(right[sortBy]) :
          right[sortBy].localeCompare(left[sortBy])
        }
        return sorted
      })
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
    async transaction (transaction) {
      const { Persons, Employees, JobTitles, LicenseTypes } = this.connection.models
      let data = await JobTitles.findAll({
        transaction: transaction,
        raw: true,
        include: [
          {
            model: Employees,
            include: [
              {
                model: Persons
              }
            ]
          },
          {
            model: LicenseTypes
          }
        ]
      })
      // console.log(data)
      return data
    },
    reAssign (item, from, to) {
      item[to] = item[from]
      delete item[from]
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
      if(item[key] === null) {
        item[key] = 0
      } else {
        item[key] = Math.abs(parseInt(item[key].diff(moment(), by)))
      }
      return item
    },
    employeeId (item) {
      const pad = function (num, size) {
        let string = num + ""
        while (string.length < size) string = '0' + string
        return string
      }
      item['EmployeeId'] = item['Age'].format('YYYYMMDD') + '' + pad(item['Id'], 5)

      return item
    },
    dataMapper (item) {
      return item
    },
    async populate () {
      this.connection = (new this.$orm).withOption({
        username: 'his',
        password: 'his',
        database: 'his',
      }).connect()
      try {
        let data = await this.connection.transaction(this.transaction)
        let test = data.slice()
        test = groupBy(test, (o) => {
          return o.Id
        })
        test = map(test, (i, k) => {
          // console.log(i)
          let Id = i[0].Id
          let Name = i[0].Name
          let Count = i.length
          return { Id, Name, Count }
        })
        // console.log(test)
        let model = test
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
