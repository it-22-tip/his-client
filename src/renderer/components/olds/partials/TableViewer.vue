<template>
  <div>
    <HotTable
      :root="root"
      :settings="hotSettings"/>
  </div>
</template>

<script>
import HotTable from 'vue-handsontable-official'
import Vue from 'vue'
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
      root: 'test-hot',
      hotSettings: {
        data: [],
        columns: [
          {
            data: 'id',
            type: 'numeric',
            width: 40
          },
          {
            data: 'flag',
            type: 'text'
          },
          {
            data: 'currencyCode',
            type: 'text'
          },
          {
            data: 'currency',
            type: 'text'
          },
          {
            data: 'level',
            type: 'numeric',
            numericFormat: {
              pattern: '0.0000'
            }
          },
          {
            data: 'units',
            type: 'text'
          },
          {
            data: 'asOf',
            type: 'date',
            dateFormat: 'MM/DD/YYYY'
          },
          {
            data: 'onedChng',
            type: 'numeric',
            numericFormat: {
              pattern: '0.00%'
            }
          }
        ],
        stretchH: 'all',
        width: 806,
        autoWrapRow: true,
        height: 487,
        maxRows: 22,
        manualRowResize: true,
        manualColumnResize: true,
        rowHeaders: true,
        colHeaders: [
          'ID',
          'Country',
          'Code',
          'Currency',
          'Level',
          'Units',
          'Date',
          'Change'
        ],
        manualRowMove: true,
        manualColumnMove: true,
        contextMenu: true,
        filters: true,
        dropdownMenu: true
      },
      currencyCodes: ['EUR', 'JPY', 'GBP', 'CHF', 'CAD', 'AUD', 'NZD', 'SEK', 'NOK', 'BRL', 'CNY', 'RUB', 'INR', 'TRY', 'THB', 'IDR', 'MYR', 'MXN', 'ARS', 'DKK', 'ILS', 'PHP']
    }
  },
  mounted () {
    let fs = require('fs')
    const readFile = async () => {
      await fs.readFile(__static + '/data.json', 'utf-8', (error, result) => {
        if (error) {
          throw error
        }
        Vue.set(this.hotSettings, 'data', JSON.parse(result))
      })
    }
    readFile()
  },
  methods: {
    flagRenderer (instance, td, row, col, prop, value, cellProperties) {
      var currencyCode = value
      while (td.firstChild) {
        td.removeChild(td.firstChild)
      }
      if (this.currencyCodes.indexOf(currencyCode) > -1) {
        var flagElement = document.createElement('DIV')

        flagElement.className = 'flag ' + currencyCode.toLowerCase()
        td.appendChild(flagElement)
      } else {
        var textNode = document.createTextNode(value === null ? '' : value)

        td.appendChild(textNode)
      }
    },
    toggle (input, property, onValue, offValue) {
      if (onValue === void 0) {
        onValue = true
      }
      if (offValue === void 0) {
        offValue = false
      }
      if (input.checked) {
        Vue.set(this.hotSettings, property, onValue)
      } else {
        Vue.set(this.hotSettings, property, offValue)
      }
    },
    toggleOption (event) {
      if (event.target.tagName.toLowerCase() !== 'input') {
        return false
      }
      switch (event.target.id) {
        case 'fixed-rows':
          this.toggle(event.target, 'fixedRowsTop', 3, 0)
          break
        case 'fixed-columns':
          this.toggle(event.target, 'fixedColumnsLeft', 3, 0)
          break
        case 'row-headers':
          this.toggle(event.target, 'rowHeaders')
          break
        case 'column-sorting':
          this.toggle(event.target, 'columnSorting')
          break
        case 'column-resize':
          this.toggle(event.target, 'manualColumnResize')
          break
      }
    }
  }
}
</script>

<style>
  #example-container {
    position: relative;
    z-index: 1;
  }
  #hot-options {
    width: 200px;
    position: absolute;
    top: 0;
    left: 0;
    padding: 15px;
    font-size: 14px;
  }
  #hot-preview {
    margin-left: 220px;
  }
  #test-hot {
    width: 600px;
    height: 400px;
    overflow: hidden;
  }
</style>
