<template>
  <md-table
    v-model="model"
    :md-sort.sync="sort"
    :md-sort-order.sync="order"
    :md-sort-fn="customSort"
    class="right-table"
    md-fixed-header>
    <md-table-row
      slot="md-table-row"
      slot-scope="{ item }"
      tabindex="0">
      <md-table-cell
        v-for="cell in tableCell"
        :key="cell.MdLabel"
        :md-label="cell.MdLabel"
        :md-sort-by="cell.MdSortBy">
        {{ item[cell.Data] }}
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
export default {
  props: {
    tableCell: {
      type: Array,
      default: () => []
    },
    activePage: {
      type: Number,
      default: 1
    },
  },
  data () {
    return {
      sort: null,
      order: null,
      page: null
    }
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
    customSort (value) {
      return value.sort((left, right) => { return -1 })
    }
  }
}
</script>

