<template>
  <md-content class="ctc">
    <md-content class="psg">
      <md-table
        v-model="model"
        :md-sort.sync="activeSort"
        :md-sort-order.sync="activeOrder"
        :md-sort-fn="sortFunction"
        class="right-table"
        md-fixed-header>
        <md-table-row
          slot="md-table-row"
          slot-scope="{ item }"
          @click.right="$refs.contextMenu.open($event, { Name: item.Name, Id:item.Ein })">
          <md-table-cell
            md-label="NIP"
            md-sort-by="Ein">{{ item.Ein }}</md-table-cell>
          <md-table-cell
            md-label="Nama"
            md-sort-by="Name">{{ item.Name }}</md-table-cell>
          <md-table-cell
            md-label="JK"
            md-sort-by="Gender">{{ item.Gender }}</md-table-cell>
          <md-table-cell
            md-label="Posisi"
            md-sort-by="JobTitle">{{ item.JobTitle }}</md-table-cell>
          <md-table-cell
            md-label="Usia"
            md-sort-by="Age">{{ item.Age }}</md-table-cell>
        </md-table-row>
      </md-table>
    </md-content>
    <md-toolbar
      class="md-primary md-dense"
      md-elevation="0">
      <div class="md-toolbar-section-start">
        <md-button
          class="md-icon-button"
          @click="$router.push({ name: 'employee.new' })">
          <md-icon>add</md-icon>
        </md-button>
      </div>
      <pagination
        :total-page="totalPage"
        v-model="activePage"/>
    </md-toolbar>
    <context-menu
      ref="contextMenu"
      @ctx-open="onCtxOpen">
      <div><h3>{{ menuData.Name }}</h3></div>
      <div @click="clickEdit(menuData.Id)"><md-icon>edit</md-icon>Edit</div>
      <div><md-icon>delete</md-icon>Delete</div>
    </context-menu>
  </md-content>
</template>

<script>
import orm from '@/mixins/orm'
import { map, extend } from 'lodash'
import paginated from './paginated'
import '@extras/contextmenu/ctx-menu.css'
export default {
  components: {
    'layout-one': () => import('@partials/layout-one'),
    'context-menu': () => import('@extras/contextmenu')
  },
  mixins: [
    orm, paginated
  ],
  data () {
    return {
      model: [],
      connection: null,
      menuData: {},
      totalPage: 10,
      activePage: 1,
      activeSort: null,
      activeOrder: null
    }
  },
  computed: {
    currentPage: function () {
      return 1
    },
    currentSort: function () {
      return this.sort
    },
    currentOrder: function () {
      return this.order
    }
  },
  /* watch: {
    activeSort: {
      handler: function (newSort, oldSort) {
        if (newSort === oldSort) return
        this.changePage({ sort: newSort })
      }
    },
    activeOrder: {
      handler: function (newOrder, oldOrder) {
        if (newOrder === oldOrder) return
        this.changePage({ order: newOrder })
      }
    },
    activePage: {
      handler: function (newPage, oldActivePage) {
        if (newPage === oldActivePage) return
        if (newPage > this.totalPage) return
        this.changePage({ page: newPage })
      }
    },
    '$route': {
      handler: function (n, o) {
        if (n === 0) return
        this.activePage = n.params.page
        this.activeSort = n.params.sort
        this.activeOrder = n.params.order
        this.populate()
      }
    }
  }, */
  watch: {
    '$route': function (val) {
      console.log(val)
    }
  },
  mounted () {
    console.log('test')
    // console.log(this.$props)
    // console.log(this.page)
    console.log(this.$route.params)
    // this.setDefault()
    // this.populate()
  },
  async beforeDestroy () {
    await this.closeConnection()
  },
  methods: {
    changePage (change) {
      let params = { page: this.currentPage, sort: this.currentSort, order: this.currentOrder }
      params = extend({}, params, change)
      let options = {
        name: 'employees.employee.list',
        params: params
      }
      this.$router.push(options)
    },
    /* setDefault () {
      this.activePage = (this.page !== null) ? this.page : 1
      this.activeSort = (this.sort !== null) ? this.sort : null
      this.activeOrder = (this.order !== null) ? 'asc' : null
    }, */
    onCtxOpen (locals) {
      this.menuData = locals
    },
    clickEdit ($event) {
      this.$router.push({ name: 'employee.detail', params: { employeeId: $event } })
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
    getOrder (Model) {
      let order = null
      let cs = this.activeSort
      switch (cs) {
        case 'Id':
          order = ['Id', this.activeOrder]
          break
        case 'Name':
          order = [Model.associations.Person, 'Name', this.activeOrder]
          break
        case 'Gender':
          order = [Model.associations.Person, 'Gender', this.activeOrder]
          break
        case 'JobTitle':
          order = [Model.associations.JobTitle, 'Name', this.activeOrder]
          break
        case 'Age':
          order = [Model.associations.Person, 'BirthDate', this.activeOrder]
          break
        default:
          order = ['Id', this.activeOrder]
      }
      return [order]
    },
    async transaction (transaction) {
      const { Persons, Employees, JobTitles } = this.connection.models
      let page = this.activePage - 1
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
            attributes: ['Name'],
            required: true
          }
        ]
      }
      let count = null
      let rows = []
      try {
        rows = await Employees.findAll(options)
        options.raw = true
        options.attributes = undefined
        count = await Employees.count(options)
      } catch (error) {
        console.log(error)
      }
      rows = map(rows, this.mapper)
      return { rows, count }
    },
    async populate () {
      let data
      this.connection = (new this.$orm()).connect()
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

.ctc {
  flex: 1;
  display: flex;
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
