<template>
  <tab-view>
    <md-content class="ctc">
      <md-content class="psg">
      <md-table
        class="right-table"
        v-model="model"
        :md-sort.sync="activeSort"
        :md-sort-order.sync="activeOrder"
        :md-sort-fn="customSort"
        md-fixed-header>
        <md-table-row slot="md-table-row" slot-scope="{ item }" @click.right="$refs.contextMenu.open($event, { Name: item.Name, Id:item.Ein })">
          <md-table-cell md-label="NIP" md-sort-by="Ein">{{ item.Ein }}</md-table-cell>
          <md-table-cell md-label="Nama" md-sort-by="Name">{{ item.Name }}</md-table-cell>
          <md-table-cell md-label="JK" md-sort-by="Gender">{{ item.Gender }}</md-table-cell>
          <md-table-cell md-label="Posisi" md-sort-by="JobTitle">{{ item.JobTitle }}</md-table-cell>
          <md-table-cell md-label="Usia" md-sort-by="Age">{{ item.Age }}</md-table-cell>
        </md-table-row>
      </md-table>

      <md-drawer class="md-right" :md-active.sync="showSearchPanel">
        <md-content style="padding: 20px;">
          <md-field md-clearable>
            <label>Nama</label>
            <md-input/>
          </md-field>
          <md-checkbox v-model="boolean">L</md-checkbox>
          <md-checkbox v-model="boolean" class="md-primary">P</md-checkbox>
          <md-field md-clearable>
            <label>Masa Kerja (Bulan)</label>
            <md-input type="number"/>
          </md-field>
          <md-button>Cari</md-button>
        </md-content>
      </md-drawer>

      </md-content>
      <md-toolbar class="md-primary md-dense" md-elevation="0">
          <div class="md-toolbar-section-start">
            <md-button @click="showSearchPanel = !showSearchPanel" class="md-icon-button">
              <md-icon>search</md-icon>
            </md-button>
            <md-button @click="$router.push({ name: 'employee.new' })" class="md-icon-button">
              <md-icon>add</md-icon>
            </md-button>
          </div>

          <div class="md-toolbar-section-end">
            <md-field class="page-md-field" md-inline md-dense>
              <md-input class="page-input" v-model="activePage" type="number" min="1" :max="totalPage"/>
            </md-field>
            <md-content class="transparent">
              Dari {{ totalPage }} Halaman
            </md-content>
          </div>
      </md-toolbar>
      <context-menu @ctx-open="onCtxOpen" ref="contextMenu">
        <div><h3>{{menuData.Name}}</h3></div>
        <div @click="clickEdit(menuData.Id)"><md-icon>edit</md-icon>Edit</div>
        <div><md-icon>delete</md-icon>Delete</div>
      </context-menu>
    </md-content>
  </tab-view>
</template>

<script>
import orm from '@/mixins/orm'
import { map, extend } from 'lodash'
import '@extras/contextmenu/ctx-menu.css'
export default {
  mixins: [
    orm
  ],
  components: {

    'tab-view': () => import('./tab'),
    'context-menu': () => import('@extras/contextmenu')
  },
  props: {
    page: {
      type: String,
      required: true
    },
    order: {
      type: String,
      default: 'asc'
    },
    sort: {
      type: String,
      default: null
    },
    isSearch: {
      type: String,
      default: 'false'
    }
  },
  data () {
    return {
      searched: [],
      model: [],
      reset: [],
      connection: null,
      searchText: '',
      searchBy: 'Name',
      selectedEmployee: null,
      boolean: false,
      showSearchPanel: false,
      menuData: {},
      totalPage: null,
      activePage: null,
      activeSort: null,
      activeOrder: null,
      searchBy: []
    }
  },
  watch: {
    activeSort: {
      handler: function (newSort, oldSort) {
        if(newSort === oldSort) return
        this.changePage({ sort: newSort })
      }
    },
    activeOrder: {
      handler: function (newOrder, oldOrder) {
        if(newOrder === oldOrder) return
        this.changePage({ order: newOrder })
      }
    },
    activePage: {
      handler: function (newPage, oldActivePage) {
        if(newPage === oldActivePage) return
        if(newPage > this.totalPage) return
        this.changePage({ page: newPage })
      }
    },
    '$route': {
      handler: function (n, o) {
        if(n === 0) return
        this.activePage = n.params.page
        this.activeSort = n.params.sort
        this.activeOrder = n.params.order
        this.populate()
      }
    }
  },
  mounted () {
    this.setDefault()
    this.populate()
  },
  async beforeDestroy () {
    await this.closeConnection()
  },
  methods: {
    changePage (change) {
      let params = { page: this.activePage, sort: this.activeSort, order: this.activeOrder }
      params = extend({}, params, change)
      let options = {
        name: 'employees.employee.list',
        params: params
      }
      this.$router.push(options)
    },
    setDefault () {
      this.activePage = (this.page !== null) ? '1' : null
      this.activeSort = (this.sort !== null) ? this.sort : null
      this.activeOrder = (this.order !== null) ? 'asc' : null
    },
    onCtxOpen(locals) {
      this.menuData = locals
    },
    clickEdit($event) {
      this.$router.push({ name: 'employee.detail', params: { employeeId: $event } })
    },
    customSort (value) {
      return value.sort((left, right) => { return -1 })
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
    getOrder (Employees) {
      let order = null
      let cs = this.activeSort
        switch (cs) {
          case 'Id':
            order = ['Id', this.activeOrder]
            break
          case 'Name':
            order = [Employees.associations.Person, 'Name', this.activeOrder]
            break
          case 'Gender':
            order = [Employees.associations.Person, 'Gender', this.activeOrder]
            break
          case 'JobTitle':
            order = [Employees.associations.JobTitle, 'Name', this.activeOrder]
            break
          case 'Age':
            order = [Employees.associations.Person, 'BirthDate', this.activeOrder]
            break
          default:
            order = ['Id', this.activeOrder]
        }
      return [order]
    },
    async transaction (transaction) {
      const { Persons, Employees, JobTitles } = this.connection.models
      let page = this.page - 1
      let limit = 10
      let offset = page * limit
      let order = this.getOrder(Employees)

      let options = {
        transaction: transaction,
        raw: false,
        attributes: ['Id'],
        limit: limit,
        offset: offset,
        order: order,
        distinct: true,
        col: 'Id',
        include: [
          {
            model: Persons,
            attributes: ['Name', 'Gender', 'BirthDate', 'Age'],
            required: true
          },
          {
            model: JobTitles,
            attributes: ['Name']
          }
        ]
      }
      let count = null
      let rows = []
      try {
        rows = await Employees.findAll(options)
        options.raw = true
        count = await Employees.count(options)
      } catch (error) {
        console.log(error)
      }
      rows = map(rows, row => {
        return {
          Ein: row.Id,
          Name: row.Person.Name,
          Age: row.Person.Age,
          Gender: row.Person.Gender,
          JobTitle: (row.JobTitle !== null) ? row.JobTitle.Name : null
        }
      })
      return { rows, count }
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
      const { rows, count } = data
      this.model = rows
      this.total = count
      this.totalPage = Math.ceil(count / 10)
    }
  }
}
</script>

<style lang="scss" scoped>
.transparent {
  background-color: transparent;
  padding: 0 10px;
}
.page-md-field.md-field {
  width: 64px;
  margin-top: 0px;
  margin-bottom: 12px;
  padding-top: 12px;
  min-height: 44px;
}
.page-md-field.md-field::before,
.page-md-field.md-field::after {
  display: none;
  width: 64px !important;
}
.page-input {
  width: 64px !important;
  padding: 5px;
  background-color: white;
  border-radius: 3px !important;
}
.ctc {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.psg {
  flex: 1;
  position: relative;
  overflow: hidden;
}
.search {
  width: 300px;
}
.search input {
  background-color: #fff;
}
.right-table {
}
</style>
