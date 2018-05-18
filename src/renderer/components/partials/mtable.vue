<template>
  <md-table
    v-model="value"
    :md-sort.sync="activeSort"
    :md-sort-order.sync="activeOrder"
    :md-sort-fn="sortFunction"
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
    value: {
      type: Array,
      default: () => []
    },
    tableCell: {
      type: Array,
      default: () => []
    },
    sort: {
      type: String,
      default: null
    },
    order: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      /* activeSort: null,
      activeOrder: null */
    }
  },
  computed: {
    model: function () {
      return this.value
    },
    activeSort: {
      get () {
        return this.sort
      },
      set (v) {
        console.log(v)
      }
    },
    activeOrder: {
      get () {
        return this.order
      },
      set (v) {
        console.log(v)
      }
    }
  },
  methods: {
    sortFunction (value) {
      return value.sort((left, right) => { return -1 })
    }
  }
}
</script>
