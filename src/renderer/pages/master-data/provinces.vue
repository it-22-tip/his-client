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
    'layout-one': () => import('@components/layout-one'),
    'mtable': () => import('@components/mtable'),
    'toolbar': () => import('@components/toolbar')
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
          MdLabel: 'Kab/Kota',
          MdSortBy: 'Count',
          Data: 'Count'
        }
      ]
    }
  },
  mounted () {
    this.activeSort = 'Name'
  },
  methods: {
    getOrder (Model) {
      let order = null
      let cs = this.activeSort
      switch (cs) {
        case 'Name':
          order = ['Name', this.activeOrder]
          break
        case 'Count':
          order = [this.$connection.literal('Count'), this.activeOrder]
          break
        default:
          order = ['Name', this.activeOrder]
      }
      return [order]
    },
    mapper (row) {
      return {
        Name: row.Name,
        Count: row.dataValues.Count
      }
    },
    async transaction (transaction) {
      const { Provinces, Regencies } = this.$connection.models
      let page = this.activePage - 1
      let limit = 15
      let offset = page * limit
      let order = this.getOrder(Provinces)

      let options = {
        transaction: transaction,
        raw: false,
        attributes: [
          'Name',
          'Code',
          [this.$connection.literal('(SELECT COUNT(Id) FROM Regencies WHERE Regencies.ProvinceCode = Provinces.Code)'), 'Count']
        ],
        limit: limit,
        offset: offset,
        order: order,
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
      let count = null
      let rows = []
      try {
        rows = await Provinces.findAll(options)
        options.raw = true
        options.attributes = undefined
        count = await Provinces.count(options)
      } catch (error) {
        console.log(error)
      }
      console.log(rows)
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
