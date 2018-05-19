<template>
  <md-content class="ctc">
    <md-content class="psg">
      <mtable
        v-model="model"
        :table-cell="tableCell"
        :sort="activeSort"
        :order="activeOrder"
        @context-menu="contextMenu"
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
  mounted () {
    this.activeSort = 'Name'
    this.populate()
  },
  methods: {
    contextMenu ($event) {
      console.log('clr')
      // $refs.contextMenu.open($event, { Name: item.Name, Id:item.Ein })
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
    mapper (row) {
      return {
        Name: row.Person.Name,
        Type: row.LicenseType.Title,
        TimeLeft: row.TimeLeft,
        DueDate: row.DueDate
      }
    },
    async transaction (transaction) {
      const { Licenses, Persons, LicenseTypes } = this.$connection.models
      let page = this.activePage - 1
      let limit = 15
      let offset = page * limit
      let order = this.getOrder(Licenses)

      let options = {
        transaction: transaction,
        raw: false,
        attributes: ['Id', 'LicenseTypeId', 'DueDate', 'TimeLeft'],
        limit: limit,
        offset: offset,
        order: order,
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
