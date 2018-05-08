<template>
  <layout-one>
    <md-content class="mc">
      <md-content class="leftist">
        <tree-viewer/>
        <md-toolbar class="md-dense">
          <md-button>Rak Baru</md-button>
          <md-button>Kategori Baru</md-button>
          <md-button>Hapus Rak</md-button>
        </md-toolbar>
      </md-content>
      <md-table
        v-model="model"
        :md-sort.sync="currentSort"
        :md-sort-order.sync="currentSortOrder"
        :md-sort-fn="customSort"
        class="right-table"
        md-fixed-header>
        <md-table-row
          slot="md-table-row"
          slot-scope="{ item }">
          <md-table-cell
            md-label="Kode"
            md-sort-by="Id">{{ item.EmployeeId }}</md-table-cell>
          <md-table-cell
            md-label="Judul"
            md-sort-by="Name">{{ item.Name }}</md-table-cell>
          <md-table-cell>
            <md-button
              class="md-icon-button"
              @click="clickEdit(item.Id)">
              <md-icon>edit</md-icon>
              <md-tooltip md-direction="top">Edit</md-tooltip>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </md-content>
    <context-menu
      id="context-menu"
      ref="ctxMenu"
      @ctx-open="onCtxOpen">
      {{ menuData.Name }}
      <div><md-icon>edit</md-icon>Show</div>
      <div><md-icon>edit</md-icon>Rename</div>
    </context-menu>
  </layout-one>
</template>

<script>
import '@extras/contextmenu/ctx-menu.css'
export default {
  components: {
    'layout-one': () => import('@partials/layout-one'),
    'tree-viewer': () => import('@partials/tree-viewer'),
    'context-menu': () => import('@extras/contextmenu')
  },
  data () {
    return {
      menuData: {},
      itemEvents: {
        contextmenu: () => {
          this.$refs.ctxMenu.open(arguments[2], { Name: '' })
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    onCtxOpen (locals) {
      console.log('open', locals)
      this.menuData = locals
    },
    treeItemClick ($event) {
      console.log($event)
      // this.$refs.ctxMenu.open($event, { Name: '' })
    },
    clickEdit ($event) {
      this.$router.push({ name: 'employees.employee.detail', params: { employeeId: $event } })
    }
  }
}
</script>

<style lang="scss">
  .mc {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  .leftist {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    width: 350px;
  }
  .right-table {
    flex: 1;
  }
  .bigger {
    height: 900px;
    width: 800px;
    display: block;
  }
</style>
