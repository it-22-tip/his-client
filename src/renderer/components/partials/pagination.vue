<template>
  <div class="md-toolbar-section-end">
    <md-field
      class="page-md-field"
      md-inline
      md-dense>
      <md-input
        :value="number"
        :max="totalPage"
        :min="min"
        class="page-input"
        type="number"
        @input="onInput"
        @keydown.stop.prevent="onKeyDown($event.key, $event.code, $event.keyCode)"
        @keydown.48.stop.prevent="onZero"
        @keydown.69.stop.prevent
        @keydown.189.stop.prevent
        @keydown.8.stop.prevent="onBackspace"/>
    </md-field>
    <span>
      Dari {{ totalPage }} Halaman
    </span>
  </div>
</template>

<script>
import { find } from 'lodash'
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
      number: null
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
      this.setInput(value)
    },
    onBackspace () {

    },
    onZero () {

    },
    onKeyDown (key, code, keyCode) {
      const numeric = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace', 'delete']
      if (find(numeric, key)) {
        console.log('find')
      }
    },
    setInput (value) {
      let valueString = `${value}`
      let totalPage = this.totalPage
      let valueLength = valueString.length
      let totalPageLength = `${totalPage}`.length
      let longerLength = valueLength > totalPageLength
      let equalLength = valueLength === totalPageLength
      let bigger = parseInt(valueString) > parseInt(totalPage)
      console.log(equalLength)
      if (longerLength) {
        console.log(value)
      }
      if (bigger) {
        console.log(value)
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
</style>
