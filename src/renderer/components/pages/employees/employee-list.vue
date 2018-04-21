<template>
  <md-content class="ctc">
    <md-content class="psg">
    <md-table
      class="right-table"
      v-model="model"
      :md-sort.sync="currentSort"
      :md-sort-order.sync="currentSortOrder"
      :md-sort-fn="customSort"
      md-fixed-header>
      <md-table-row slot="md-table-row" slot-scope="{ item }" @click.right="$refs.ctxMenu.open($event, { Name: item.Name, Id:item.Id })">
        <md-table-cell md-label="NIP" md-sort-by="Id">{{ item.EmployeeId }}</md-table-cell>
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

          <md-button class="md-icon-button">
            <md-icon>person_add</md-icon>
          </md-button>

          <md-button class="md-icon-button">
            <md-icon>help</md-icon>
          </md-button>
        </div>

        <div class="md-toolbar-section-end">
          <md-field class="page-md-field" md-inline md-dense>
            <md-input class="page-input" v-model="cpage" type="number" min="1" :max="totalPage"/>
          </md-field>
          <md-content class="transparent">
            Dari {{ totalPage }} Halaman
          </md-content>
        </div>
    </md-toolbar>
    <context-menu @ctx-open="onCtxOpen" id="context-menu" ref="ctxMenu">
      {{menuData.Name}}
      <div><md-icon>edit</md-icon>Show</div>
      <div @click="clickEdit(menuData.Id)"><md-icon>edit</md-icon>Edit</div>
      <div><md-icon>print</md-icon>Print</div>
    </context-menu>
  </md-content>
</template>

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
.right-table {
}
</style>

<script>
import orm from '@/mixins/orm'
import { map, rest } from 'lodash'
import moment from 'moment'
import { toDateDiffToday, toMoment, employeeId } from '@helpers/databaseTo'
import '@extras/contextmenu/ctx-menu.css'
export default {
  mixins: [
    orm
  ],
  components: {
    'layout-one': () => import('@partials/layout-one'),
    'context-menu': () => import('@extras/contextmenu')
  },
  props: {
    page: {
      type: String,
      required: true
    },
    order: {
      type: String,
      default: 'desc'
    },
    sort: {
      type: String,
      default: null
    }
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
      boolean: false,
      showSearchPanel: false,
      menuData: {},
      cpage: 1,
      totalPage: null
    }
  },
  watch: {
    cpage: {
      handler: function (n, o) {
        if(n === o) return
        // this.toPage(newP)
        // n = parseInt(n)
        this.$router.push({ name: 'employees.employee.list', params: { page: n, sort: this.currentSort, order: this.currentSortOrder } })
      }
    },
    '$route': {
      handler: function (n, o) {
        if(n === 0) return
        console.log(n)
        this.populate()
      }
    }
  },
  mounted () {
    console.log(this)
    this.populate()
  },
  async beforeDestroy () {
    await this.closeConnection()
  },
  methods: {
    toPage (page) {
      console.log(page)
      this.$router.push({ name: 'employees.employee.list', params: { page: page } })
    },
    onCtxOpen(locals) {
        console.log('open', locals)
        this.menuData = locals
    },
    clickEdit($event) {
      this.$router.push({ name: 'employee.detail', params: { employeeId: $event } })
    },
    customSort (value) {
      this.populate()
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
    getOrder (Employees) {
      let order = null
      let cs = this.currentSort
        switch (cs) {
          case 'Id':
            order = ['Id', this.currentSortOrder]
            break
          case 'Name':
            order = [Employees.associations.Person, 'Name', this.currentSortOrder]
            break
          case 'Gender':
            order = [Employees.associations.Person, 'Gender', this.currentSortOrder]
            break
          case 'JobTitle':
            order = [Employees.associations.JobTitle, 'Name', this.currentSortOrder]
            break
          default:
            order = ['Id', this.currentSortOrder]
        }
        console.log(cs)
          // ['Id', this.currentSortOrder]
          //[Employees.associations.Person, 'Name', this.currentSortOrder]
          // [Employees.associations.Person, 'Gender', this.currentSortOrder]
          // [Employees.associations.JobTitle, 'Name', this.currentSortOrder]
          // ['Age', this.currentSortOrder]
      return [order]
    },
    async transaction (transaction) {
      const { Persons, Employees, JobTitles } = this.connection.models
      let page = this.page - 1      // page number
      let limit = 10   // number of records per page
      let offset = page * limit
      let order = this.getOrder(Employees)
      let data = await Employees.findAndCountAll({
        transaction: transaction,
        raw: true,
        attributes: ['Id'],
        limit: limit,
        offset: offset,
        order: order,
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
      const { rows, count } = data
      let model = rows.slice()
            // model = map(model, this.dataMapper)
      this.model = map(model, this.dataMapper)
      this.model = model
      this.total = count
      this.totalPage = Math.ceil(count / 10)
    }
  }
}
</script>
