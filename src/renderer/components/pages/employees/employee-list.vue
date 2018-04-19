<template>
  <md-content class="ctc">
    <md-table
      class="right-table"
      v-model="model"
      :md-sort.sync="currentSort"
      :md-sort-order.sync="currentSortOrder"
      :md-sort-fn="customSort"
      md-fixed-header>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="NIP" md-sort-by="Id">{{ item.EmployeeId }}</md-table-cell>
        <md-table-cell md-label="Nama" md-sort-by="Name">{{ item.Name }}</md-table-cell>
        <md-table-cell md-label="JK" md-sort-by="Gender">{{ item.Gender }}</md-table-cell>
        <md-table-cell md-label="Posisi" md-sort-by="JobTitle">{{ item.JobTitle }}</md-table-cell>
        <md-table-cell md-label="Usia" md-sort-by="Age">{{ item.Age }}</md-table-cell>
        <md-table-cell>
          <md-button @click="clickEdit(item.Id)" class="md-icon-button">
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Edit</md-tooltip>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-toolbar class="md-primary md-dense">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button">
            <md-icon>menu</md-icon>
          </md-button>
        </div>
        <!-- <md-field class="search">
          <md-input/>
        </md-field> -->
        <!-- <md-autocomplete
          class="search"
          v-model="selectedEmployee"
          :md-options="employees"
          md-layout="box">
          <label>Cari...</label>
        </md-autocomplete> -->

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button">
            <md-icon>refresh</md-icon>
          </md-button>

          <md-button class="md-icon-button">
            <md-icon>more_vert</md-icon>
          </md-button>
        </div>
      </div>
    </md-toolbar>


  </md-content>
</template>

<style lang="scss" scoped>
.ctc {
  flex: 1;
}
.search {
  width: 300px;
}
.search input {
  background-color: #fff;
}
</style>

<script>
import orm from '@/mixins/orm'
import { map } from 'lodash'
import moment from 'moment'
import { toDateDiffToday, toMoment, employeeId } from '@helpers/databaseTo'
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
      searchBy: 'Name',
      selectedEmployee: null,
      employees: [
        'Algeria',
        'Argentina',
        'Brazil',
        'Canada',
        'Italy',
        'Japan',
        'United Kingdom',
        'United States'
      ]
    }
  },
  mounted () {
    this.populate().then(
      data => {
        let model = data.slice()
        model = map(model, this.dataMapper)
        console.log(model)
        this.$nextTick().then(
          () => {
            for(let item of model) {
              this.model.push(item)
            }
          }
        )
        // this.model = map(model, this.dataMapper)
      }
    )
  },
  async beforeDestroy () {
    await this.closeConnection()
  },
  methods: {
    clickEdit($event) {
      this.$router.push({ name: 'employee.detail', params: { employeeId: $event } })
    },
    clickSearch () {
      const toLower = text => {
          return text.toString().toLowerCase()
      }
      let s
      if (this.reset.length < 1) {
        this.reset = this.model.splice()
        console.log(this.reset)
      } else {
        this.model = this.reset
      }
      try {
      s = this.model.filter(item => toLower(item.Name).includes(toLower(this.searchText)))
      } catch (error) {
        console.log(error)
      }
      console.log(this.reset)
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
      const { Persons, Employees, JobTitles } = this.connection.models
      let data = await Employees.findAll({
        transaction: transaction,
        raw: true,
        attributes: ['Id'],
        include: [
          {
            model: Persons,
            attributes: ['Name', 'Gender', 'BirthDate'],
          },
          {
            model: JobTitles,
            attributes: ['Name']
          }
        ]
      })
      return data
    },
    reAssign (item, from, to) {
      item[to] = item[from]
      delete item[from]
      return item
    },
    dataMapper (item) {
      item = this.reAssign(item, 'Person.Name', 'Name')
      item = this.reAssign(item, 'Person.Gender', 'Gender')
      item = this.reAssign(item, 'JobTitle.Name', 'JobTitle')
      item = this.reAssign(item, 'Person.BirthDate', 'Age')
      item = toMoment(item, 'Age')
      item = employeeId(item)
      item = toDateDiffToday(item, 'Age')
      return item
    },
    async populate () {
      let data
      this.connection = (new this.$orm).withOption({
        username: 'his',
        password: 'his',
        database: 'his',
      }).connect()
      try {
        data = await this.connection.transaction(this.transaction)
      } catch (error) {
        console.log(error)
      } finally {
        await this.closeConnection()
      }
      return data
    }
  }
}
</script>
