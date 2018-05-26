<template>
  <md-content class="ctc">
    <md-content class="psg">
      <md-table
        v-model="model"
        :md-sort.sync="activeSort"
        :md-sort-order.sync="activeOrder"
        :md-sort-fn="customSort"
        md-fixed-header>
        <md-table-row
          slot="md-table-row"
          slot-scope="{ item }">
          <md-table-cell
            md-label="Provinsi"
            md-sort-by="Name">{{ item.Name }}</md-table-cell>
          <md-table-cell
            md-label="Kab/Kota"
            md-sort-by="Count">{{ item.Count }}</md-table-cell>
        </md-table-row>
      </md-table>
    </md-content>
    <md-toolbar
      class="md-primary md-dense"
      md-elevation="0">
      <div class="md-toolbar-section-start">
        <md-button
          class="md-icon-button"
          @click="showSearchPanel = !showSearchPanel">
          <md-icon>search</md-icon>
        </md-button>
        <md-button
          class="md-icon-button"
          @click="$router.push({ name: 'employee.new' })">
          <md-icon>add</md-icon>
        </md-button>
        {{ activePage }} / {{ activeSort }} / {{ activeOrder }}
      </div>

      <div class="md-toolbar-section-end">
        <md-field
          class="page-md-field"
          md-inline
          md-dense>
          <md-input
            v-model="activePage"
            :max="totalPage"
            class="page-input"
            type="number"
            min="1"/>
        </md-field>
        <md-content class="transparent">
          Dari {{ totalPage }} Halaman
        </md-content>
      </div>
    </md-toolbar>
  </md-content>
</template>

<script>
import orm from '@mixins/orm'
import { map, extend } from 'lodash'
export default {
  components: {
    'layout-one': () => import('@partials/layout-one')
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
      default: 'asc'
    },
    sort: {
      type: String,
      default: 'Name'
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
      activeOrder: null
    }
  },
  watch: {
    activeSort: {
      handler: function (newSort, oldSort) {
        console.log(newSort)
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
  methods: {
    customSort (value) {
      return value.sort((left, right) => {
        return -1
      })
    },
    changePage (change) {
      let params = { page: this.activePage, sort: this.activeSort, order: this.activeOrder }
      params = extend({}, params, change)
      let options = {
        name: 'masterdata.provinces',
        params: params
      }
      this.$router.push(options)
    },
    setDefault () {
      console.log(this.sort)
      this.activePage = (this.page !== null) ? '1' : null
      this.activeSort = (this.sort !== null) ? this.sort : null
      this.activeOrder = (this.order !== null) ? 'asc' : null
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

    getOrder (Model, sequelize) {
      let order = null
      let cs = this.activeSort
      switch (cs) {
        case 'Name':
          order = ['Name', this.activeOrder]
          break
        case 'Count':
          order = [sequelize.literal('Count'), this.activeOrder]
          break
        default:
          order = ['Name', this.activeOrder]
      }
      return [order]
    },

    async transaction (transaction) {
      let sequelize = this.connection
      const { Regencies, Provinces } = sequelize.models

      let page = this.activePage - 1
      let limit = 10
      let offset = page * limit
      let order
      try {
        order = this.getOrder(Provinces, sequelize)
      } catch (error) {
        console.log(error)
      }
      let rows = []
      let count = 0
      let options = {
        transaction: transaction,
        attributes: [
          'Name',
          'Code',
          [sequelize.literal('(SELECT COUNT(Id) FROM Regencies WHERE Regencies.ProvinceCode = Provinces.Code)'), 'Count']
        ],
        order: order,
        limit: limit,
        offset: offset,
        raw: false,
        distinct: true,
        col: 'Id',
        include: [
          {
            model: Regencies,
            attributes: ['ProvinceCode'],
            required: true
          }
        ]
      }
      try {
        rows = await Provinces.findAll(options)
        options.raw = true
        options.attributes = undefined
        count = await Provinces.count(options)
      } catch (error) {
        throw error
      }
      rows = map(rows, row => {
        return {
          Name: row.Name,
          Count: row.dataValues.Count
        }
      })
      console.log(count)
      return {rows, count}
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
