<template>
  <md-content class="ctc">
    <md-content class="psg">
      <mtable
        v-model="model"
        :table-cell="tableCell"
        :sort="activeSort"
        :order="activeOrder"
        @change-sort="changePage({ sort: $event })"
        @change-order="changePage({ order: $event })"/>
    </md-content>
    <toolbar
      :total="totalPage"
      :page="activePage"
      @change-page="changePage({ page: $event })"/>
  </md-content>
</template>

<script>
import orm from '@/mixins/orm'
import paginated from '@/mixins/paginated'
import populate from '@/mixins/populate'
import { map } from 'lodash'
export default {
  components: {
    'layout-one': () => import('@partials/layout-one'),
    'mtable': () => import('@partials/mtable'),
    'toolbar': () => import('@partials/toolbar')
  },
  mixins: [
    orm,
    paginated,
    populate
  ],
  data () {
    return {
      model: [],
      tableCell: [
        {
          MdLabel: 'NIP',
          MdSortBy: 'Ein',
          Data: 'Ein'
        },
        {
          MdLabel: 'Nama',
          MdSortBy: 'Name',
          Data: 'Name'
        },
        {
          MdLabel: 'JK',
          MdSortBy: 'Gender',
          Data: 'Gender'
        },
        {
          MdLabel: 'Posisi',
          MdSortBy: 'JobTitle',
          Data: 'JobTitle'
        },
        {
          MdLabel: 'Usia',
          MdSortBy: 'Age',
          Data: 'Age'
        }
      ]
    }
  },
  mounted () {
    this.activeSort = 'Name'
    this.populate()
  },
  methods: {
    getOrder (Model) {
      let order = null
      let cs = this.activeSort
      switch (cs) {
        case 'Ein':
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
    mapper (row) {
      return {
        Ein: row.Id,
        Name: row.Person.Name,
        Age: row.Person.Age,
        Gender: row.Person.Gender,
        JobTitle: (row.JobTitle !== null) ? row.JobTitle.Name : null
      }
    },
    async transaction (transaction) {
      const { Persons, Employees, JobTitles } = this.$connection.models
      let page = this.activePage - 1
      let limit = 15
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
</style>
