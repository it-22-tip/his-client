<template>
  <div class="hr-table-wrapper">
    <md-toolbar class="md-dense" md-elevation="0">Table</md-toolbar>
    <HotTable :root="root" :settings="hotSettings" class="hr-table" ref="hrTable"></HotTable>
    <md-toolbar class="md-dense" md-elevation="0">Table</md-toolbar>
  </div>
</template>

<script>
  import Vue from 'vue'
  // import {helper, editors} from 'handsontable/dist/handsontable.js'
  import Handsontable from 'handsontable/dist/handsontable.js'
  const {helper, editors} = Handsontable
  const HotTable = () => import('vue-handsontable-official')
  const MdDateEditor = editors.getEditor('base').prototype.extend()
  const NoEditEditor = editors.getEditor('base').prototype.extend()

  export default {
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
              type: 'text',
              editor: false
            },
            {
              data: 'NAMA',
              type: 'text',
              editor: false
            },
            {
              data: 'TANGGAL.DITERIMA',
              renderer: this.MdDateRenderer,
              editor: MdDateEditor
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
            'Nama',
            'Pendidikan'
          ],
          contextMenu: {
            callback: function (key, options) {
              if (key === 'about') {
                console.log(options)
              }
            },
            items: {
              'about': {
                name: 'about this menu'
              }
            }
          },
          languageString: 'ID',
          manualRowMove: true,
          manualColumnMove: true,
          filters: true,
          search: true,
          dropdownMenu: [
            'filter_by_nik'
          ],
          sortIndicator: true,
          columnSorting: {
            column: 1,
            sortOrder: true,
            sortEmptyCells: true
          },
          afterChange: (change, source) => {
            if(source === 'loadData')
            this.afterChangeVue(change, source)
          },
          afterInit: () => {
            // after init
          },
          onBeforeKeyDown (event) {
            const { MOUSE_RIGHT, DELETE, BACKSPACE } = helper.KEY_CODES

            switch(event.keyCode) {
              case DELETE:
                event.stopImmediatePropagation()
                event.preventDefault()
                break

              case BACKSPACE:
                event.stopImmediatePropagation()
                event.preventDefault()
                break

              default:
                console.log(event)
                break
            }
          }
        },
        showDialog: false,
        selectedDate: null,
        dialogValue: null
      }
    },
    methods: {
      afterChangeVue (change, source) {
        let table = this.$refs.hrTable.table
        console.log(table)
      },
      onBeforeKeyDown (that, event) {
        // let instance = that.instance
        // let editor = instance.getActiveEditor()
        // dom.enableImmediatePropagation(event)
        // console.log(dom)
        // console.log(helper.KEY_CODES)
        const { ARROW_UP, ARROW_DOWN } = helper.KEY_CODES

        switch (event.keyCode) {
          case ARROW_UP:
            event.stopImmediatePropagation() // prevent EditorManager from processing this event
            event.preventDefault() // prevent browser from scrolling the page up
            break

          case ARROW_DOWN:
            event.stopImmediatePropagation() // prevent EditorManager from processing this event
            event.preventDefault() // prevent browser from scrolling the page up
            break
        }
      },
      calRend () {

      },
      MdDateRenderer (instance, td, row, col, prop, value, cellProperties) {
        let escaped = helper.stringify(value)
        escaped = '<div>' + escaped + '</div>'
        escaped = Vue.compile(escaped)
        console.log(escaped.render())
        // td.innerHTML = escaped
        // console.log(this.render)
        // console.log(this.$refs.hrTable)
        return td
      },
      MdDateEditor () {
        let that = this
        MdDateEditor.prototype.open = function () {
          // console.log(that)
          // console.log(this)
          // that.dialogValue = null

          this.instance.addHook('beforeKeyDown', (event) => {
            that.onBeforeKeyDown(this, event)
          })
          // that.showDialog = true
        }
        MdDateEditor.prototype.close = function () {
          // console.log('close')
          // that.showDialog = false
        }
        MdDateEditor.prototype.focus = function () {
          // console.log('focus')
        }
        MdDateEditor.prototype.setValue = function (value) {
          // that.dialogValue = value
        }
        MdDateEditor.prototype.getValue = function () {
          // return that.dialogValue
        }
      },
      NoEditEditor () {
        let that = this
        NoEditEditor.prototype.prepare = function () {

        }
        NoEditEditor.prototype.open = function () {
          this.instance.addHook('beforeKeyDown', (event) => {
            that.onBeforeKeyDown(this, event)
          })
        }
        NoEditEditor.prototype.close = function () {
        }
        NoEditEditor.prototype.focus = function () {
        }
        NoEditEditor.prototype.setValue = function (value) {
        }
        NoEditEditor.prototype.getValue = function () {
        }
      }
    },
    created () {
      this.MdDateEditor()
      this.NoEditEditor()
    },
    mounted () {
      // console.log(this.$refs)
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
    name: 'SampleApp',
    components: {
      HotTable
    }
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
