<template>
  <layout-one>
    <md-content class="mc">
      <md-content class="leftist">
        <div class="parentbox">
          <div class="innerbox">
            <tree-view :item-data="initialData" @item-click="treeItemClick" ref="tree"></tree-view>
          </div>
        </div>
      </md-content>
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
          <md-table-cell>
            <md-button @click="clickEdit(item.Id)" class="md-icon-button">
              <md-icon>edit</md-icon>
              <md-tooltip md-direction="top">Edit</md-tooltip>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </md-content>
  </layout-one>
</template>

<script>
import orm from '@/mixins/orm'
import { readJSON } from '@/helpers/files'
import { map } from 'lodash'
import moment from 'moment'
import path from 'path'
import { appDataPath } from '@helpers/constants'
export default {
  mixins: [
    orm
  ],
  components: {
    'layout-one': () => import('@partials/layout-one'),
    'tree-view': () => import('@extras/tree-view'),
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
      asyncData: [],
      initialData: [
        {
          id: 1,
          value: 'test'
        }
      ]
    }
  },
  mounted () {
    this.populate()
    this.populateTree()
  },
  async beforeDestroy () {
    await this.closeConnection()
  },
  methods: {
    async populateTree () {
      let tree = []
      try {
        tree = await readJSON(path.join(appDataPath, '/example/doctree.json'))
        // this.initialData
      } catch (error) {
        console.log(error)
      }
      this.initialData = tree
      this.$nextTick().then(
        () => {
          this.$refs.tree.initialize()
        }
      )
    },
    treeItemClick () {

    },
    clickEdit($event) {
      this.$router.push({ name: 'employees.employee.detail', params: { employeeId: $event } })
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
      item = this.reAssign(item, 'Person.Name', 'Name')
      item = this.reAssign(item, 'Person.Gender', 'Gender')
      item = this.reAssign(item, 'JobTitle.Name', 'JobTitle')
      item = this.reAssign(item, 'Person.BirthDate', 'Age')
      item = this.toMoment(item, 'Age')
      item = this.employeeId(item)
      item = this.toDateDiffToday(item, 'Age')
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

<style lang="scss">
  .mc {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  .leftist {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  .parentbox {
    padding: 20px;
    flex: 1;
    overflow: hidden;
    display: flex;
    min-height: 0;
    position: relative;
  }
  .innerbox {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    height: 100%;
    display: block;
    width: 100%;
    overflow: auto;
  }
.innerbox::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

/* Track */
.innerbox::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
.innerbox::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
.innerbox::-webkit-scrollbar-thumb:hover {
    background: #555;
}
  .bigger {
    height: 900px;
    width: 800px;
    display: block;
  }
</style>


