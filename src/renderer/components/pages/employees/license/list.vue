<template>
  <md-content class="ctc">
    <md-content class="psg">
      <mtable
        v-model="model"
        :table-cell="tableCell"
        :sort="sort"
        :order="order"/>
    </md-content>
    <toolbar/>
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
import '@extras/contextmenu/ctx-menu.css'
export default {
  components: {
    'layout-one': () => import('@partials/layout-one'),
    'context-menu': () => import('@extras/contextmenu'),
    'mtable': () => import('@partials/mtable'),
    'toolbar': () => import('./toolbar')
  },
  mixins: [
    orm
  ],
  props: {
    page: {
      type: String,
      default: '1'
    },
    order: {
      type: String,
      default: 'ASC'
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
      tableCell: [
        {
          MdLabel: 'Nama',
          MdSortBy: 'Name',
          Data: 'Name'
        },
        {
          MdLabel: 'Jenis',
          MdSortBy: 'Type',
          Data: 'Type'
        },
        {
          MdLabel: 'Habis',
          MdSortBy: 'DueDate',
          Data: 'TimeLeft'
        }
      ]
    }
  },
  watch: {
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
        name: 'employees.license.list',
        params: params
      }
      this.$router.push(options)
    },
    setDefault () {
      this.activePage = (this.page !== null) ? this.page : '1'
      this.activeSort = (this.sort !== null) ? this.sort : null
      this.activeOrder = (this.order !== null) ? 'asc' : null
    },
    onCtxOpen (locals) {
      this.menuData = locals
    },
    clickEdit ($event) {
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
    getOrder (Model) {
      let order = null
      let cs = this.activeSort
      switch (cs) {
        case 'Type':
          order = ['LicenseTypeId', this.activeOrder]
          break
        case 'Name':
          order = [Model.associations.Person, 'Name', this.activeOrder]
          break
        case 'DueDate':
          order = ['DueDate', this.activeOrder]
          break
        default:
          order = [Model.associations.Person, 'Name', this.activeOrder]
      }
      return [order]
    },
    async transaction (transaction) {
      const { Licenses, Persons, LicenseTypes } = this.connection.models
      let page = this.activePage - 1
      let limit = 10
      let offset = page * limit
      let order = this.getOrder(Licenses)

      let options = {
        transaction: transaction,
        raw: false,
        attributes: ['Id', 'LicenseTypeId', 'DueDate', 'TimeLeft'],
        limit: limit,
        offset: offset,
        order: order,
        // logging: console.log,
        distinct: true,
        col: 'Id',
        include: [
          {
            model: Persons,
            attributes: ['Name'],
            required: true
          },
          {
            model: LicenseTypes,
            attributes: ['Title'],
            required: true
          }
        ]
      }
      let count = null
      let rows = []
      try {
        rows = await Licenses.findAll(options)
        options.raw = true
        options.attributes = undefined
        count = await Licenses.count(options)
      } catch (error) {
        console.log(error)
      }
      // console.log(rows)
      rows = map(rows, row => {
        return {
          Name: row.Person.Name,
          Type: row.LicenseType.Title,
          TimeLeft: row.TimeLeft,
          DueDate: row.DueDate
        }
      })
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
</style>
