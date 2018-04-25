<template>
  <div class="hr-table-wrapper">
    <md-toolbar
      class="md-dense"
      md-elevation="0">Table</md-toolbar>
    <HotTable
      :root="root"
      :settings="hotSettings"
      class="hr-table"/>
    <md-toolbar
      class="md-dense"
      md-elevation="0">Table</md-toolbar>
  </div>
</template>

<script>
import Vue from 'vue'
const HotTable = () => import('vue-handsontable-official')
export default {
  name: 'SampleApp',
  components: {
    HotTable
  },
  props: [
    'json'
  ],
  data () {
    return {
      root: 'custom-table',
      hotSettings: {
        data: [],
        columns: [
          {
            data: 'NIK',
            type: 'text'
          },
          {
            data: 'NAMA',
            type: 'text'
          }
        ],
        stretchH: 'all',
        // width: 800,
        autoWrapRow: true,
        height: '100%',
        manualRowResize: true,
        manualColumnResize: true,
        rowHeaders: true,
        colHeaders: [
          'NIK',
          'Nama'
        ],
        manualRowMove: true,
        manualColumnMove: true,
        contextMenu: false,
        filters: true,
        search: true,
        dropdownMenu: true,
        sortIndicator: true,
        columnSorting: {
          column: 1,
          sortOrder: true,
          sortEmptyCells: true
        }
      }
    }
  },
  mounted () {
    let fs = require('fs')
    const readFile = async () => {
      await fs.readFile(__static + '/employee.json', 'utf-8', (error, result) => {
        if (error) {
          throw error
        }
        Vue.set(this.hotSettings, 'data', JSON.parse(result))
      })
    }
    readFile()
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  @import "~vue-material/dist/theme/engine";
  .hr-table-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    z-index: 1;
  }
  .hr-table {
    flex: 1;
  }

</style>
