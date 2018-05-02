<template>
  <layout-one>
    <md-content class="mc">
      <md-content class="leftist">
        <tree-view
          ref="tree"
          :item-data="initialData"
          :item-events="itemEvents"/>
        <md-toolbar class="md-dense">
          <md-button>Rak Baru</md-button>
          <md-button>Kategori Baru</md-button>
          <md-button>Hapus Rak</md-button>
        </md-toolbar>
      </md-content>
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
            md-label="Kode"
            md-sort-by="Id">{{ item.EmployeeId }}</md-table-cell>
          <md-table-cell
            md-label="Judul"
            md-sort-by="Name">{{ item.Name }}</md-table-cell>
          <md-table-cell>
            <md-button
              class="md-icon-button"
              @click="clickEdit(item.Id)">
              <md-icon>edit</md-icon>
              <md-tooltip md-direction="top">Edit</md-tooltip>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </md-content>
    <context-menu
      id="context-menu"
      ref="ctxMenu"
      @ctx-open="onCtxOpen">
      {{ menuData.Name }}
      <div><md-icon>edit</md-icon>Show</div>
      <div><md-icon>edit</md-icon>Rename</div>
    </context-menu>
  </layout-one>
</template>

<script>
import orm from '@/mixins/orm'
import { readJSON } from '@/helpers/files'
import { map } from 'lodash'
import moment from 'moment'
import path from 'path'
import { appDataPath } from '@helpers/constants'
import '@extras/contextmenu/ctx-menu.css'
export default {
  components: {
    'layout-one': () => import('@partials/layout-one'),
    'tree-view': () => import('@extras/tree-view'),
    'context-menu': () => import('@extras/contextmenu')
  },
  mixins: [
    orm
  ],
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
      ],
      menuData: {},
      itemEvents: {
        contextmenu: () => {
          console.log(arguments)
          this.$refs.ctxMenu.open(arguments[2], { Name: '' })
        }
      }
    }
  },
  mounted () {
    // this.populate()
    this.populateTree()
  },
  async beforeDestroy () {
    await this.closeConnection()
  },
  methods: {
    onCtxOpen (locals) {
      console.log('open', locals)
      this.menuData = locals
    },
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
    treeItemClick ($event) {
      console.log($event)
      // this.$refs.ctxMenu.open($event, { Name: '' })
    },
    clickEdit ($event) {
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
        if (sortBy === 'Id' || sortBy === 'Age') {
          sorted = desc
            ? left[sortBy] - right[sortBy]
            : right[sortBy] - left[sortBy]
        } else {
          sorted = desc
            ? left[sortBy].localeCompare(right[sortBy])
            : right[sortBy].localeCompare(left[sortBy])
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
            attributes: ['Name', 'Gender', 'BirthDate']
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
      if (item[key] === null) {
        item[key] = 0
      } else {
        item[key] = Math.abs(parseInt(item[key].diff(moment(), by)))
      }
      return item
    },
    employeeId (item) {
      const pad = function (num, size) {
        let string = num + ''
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

<style lang="scss">
  .mc {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  .leftist {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    width: 350px;
  }
  .right-table {
    flex: 1;
  }
  .bigger {
    height: 900px;
    width: 800px;
    display: block;
  }
</style>
