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
      class="trow"
      tabindex="0"
      @click.right="clickRight">
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
import '@extras/contextmenu/ctx-menu.css'
export default {
  components: {
    'context-menu': () => import('@extras/contextmenu')
  },
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
      menuData: {}
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
        this.$emit('change-sort', v)
      }
    },
    activeOrder: {
      get () {
        return this.order
      },
      set (v) {
        this.$emit('change-order', v)
      }
    }
  },
  methods: {
    sortFunction (value) {
      return value.sort((left, right) => { return -1 })
    },
    onCtxOpen () {
    },
    clickEdit () {
    },
    clickRight (e) {
      this.$emit('context-menu', e)
      // $refs.contextMenu.open($event, { Name: item.Name, Id:item.Ein })
    }
  }
}
</script>

<style lang="scss">
.trow:focus {
  outline: none;
}
.md-table.md-theme-default .md-table-row.trow:focus:not(.md-header-row) .md-table-cell {
    background-color: rgba(0, 0, 0, 0.05);
    // background-color: var(--md-theme-default-highlight-on-background, rgba(0, 0, 0, 0.08));
}
.trow .md-table-cell {
  height: 40px;
}
</style>
