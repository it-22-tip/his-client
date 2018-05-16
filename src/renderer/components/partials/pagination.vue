<template>
  <div class="md-toolbar-section-end">
    {{ number }}
    <md-field
      :md-counter="false"
      class="page-md-field"
      md-inline
      md-dense>
      <md-input
        :value="number"
        :max="totalPage"
        :min="min"
        :maxlength="3"
        class="page-input"
        type="number"
        @input="onInput"
        @select="onSelect"
        @keydown.capture="onKeyDown($event)"
        @mouseup.capture="onMouseUp"/>
    </md-field>
    <span>
      Dari {{ totalPage }} Halaman
    </span>
  </div>
</template>

<script>
// import { find } from 'lodash'
export default {
  props: {
    value: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      model: null,
      number: null,
      selection: false
    }
  },
  watch: {
    value: {
      handler: function (v) {
        // console.log({watchvalue: v})
      }
    },
    model: {
      handler: function (value) {
        console.log({watchmodel: value})
        value = parseInt(value)
        value = isNaN(value) ? this.min : value
        value = (value < this.min) ? this.min : value
        value = (value > this.totalPage) ? this.totalPage : value
        this.model = value
        // console.log({emit: value})
        this.$emit('input', value)
        return value
      }
    },
    number: {
      handler: function (value) {
        console.log({nc: value})
      }
    }
  },
  mounted () {
    console.log({pagination: this.$route})
  },
  methods: {
    onInput (value) {
      this.number = value
    },
    onBackspace () {

    },
    onZero () {

    },
    onMouseUp () {
      this.selection = false
    },
    onSelect (event) {
      this.selection = true
    },
    onKeyDown (event) {
      if (event.key === 'e') {
        event.preventDefault()
      }
      if (event.key === '-') {
        event.preventDefault()
      }
      let reg = /[\d]/
      if (event.key.length === 1 && reg.test(event.key)) {
        let n = parseInt(this.number)
        n = isNaN(n) ? 0 : n
        n = `${n}`
        if (this.selection) {
          /* let selection = window.getSelection()
          let range = selection.getRangeAt(0)
          let StartToEnd = range.START_TO_END
          let EndToStart = range.END_TO_START
          let StartToEnd = range.START_TO_END
          let StartToStart = range.START_TO_START */
          // console.log(selection.toString())
          // let ae = document.activeElement
          // console.log(ae.selectionStart)
          try {
            console.log(event)
            console.log(document.createRange())
          } catch (e) {
            console.log(e)
          }
        }
        if (n.length >= 3) event.preventDefault()
      }
    },
    setInput (value) {
      let valueString = `${value}`
      let totalPage = this.totalPage
      let valueLength = valueString.length
      let totalPageLength = `${totalPage}`.length
      let longerLength = valueLength > totalPageLength
      let bigger = parseInt(valueString) > parseInt(totalPage)
      if (longerLength) {
        return
      }
      if (bigger) {
        console.log('bigger')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .transparent {
    background-color: transparent;
    padding: 0 10px;
  }
  .page-md-field.md-field {
    width: 64px;
    margin-top: 0px;
    margin-bottom: 12px;
    padding-top: 12px;
    min-height: 44px;
  }
  .page-md-field.md-field::before,
  .page-md-field.md-field::after {
    display: none;
    width: 64px !important;
  }
  .page-input {
    width: 64px !important;
    padding: 5px;
    background-color: white;
    border-radius: 3px !important;
  }
  .page-md-field.md-field .md-count {
    display: none;
  }
</style>
