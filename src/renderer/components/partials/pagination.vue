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
        type="text"
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
        // console.log({nc: value})
      }
    }
  },
  mounted () {
    console.log({pagination: this.$route})
  },
  methods: {
    getInputSelection (el) {
      var start = 0
      var end = 0
      var normalizedValue
      var range
      var textInputRange
      var len
      var endRange

      if (typeof el.selectionStart === 'number' && typeof el.selectionEnd === 'number') {
        start = el.selectionStart
        end = el.selectionEnd
      } else {
        range = document.selection.createRange()

        if (range && range.parentElement() === el) {
          len = el.value.length
          normalizedValue = el.value.replace(/\r\n/g, '\n')

          // Create a working TextRange that lives only in the input
          textInputRange = el.createTextRange()
          textInputRange.moveToBookmark(range.getBookmark())

          // Check if the start and end of the selection are at the very end
          // of the input, since moveStart/moveEnd doesn't return what we want
          // in those cases
          endRange = el.createTextRange()
          endRange.collapse(false)

          if (textInputRange.compareEndPoints('StartToEnd', endRange) > -1) {
            start = end = len
          } else {
            start = -textInputRange.moveStart('character', -len)
            start += normalizedValue.slice(0, start).split('\n').length - 1

            if (textInputRange.compareEndPoints('EndToEnd', endRange) > -1) {
              end = len
            } else {
              end = -textInputRange.moveEnd('character', -len)
              end += normalizedValue.slice(0, end).split('\n').length - 1
            }
          }
        }
      }

      return {
        start: start,
        end: end
      }
    },
    replaceSelectedText (el, text) {
      var sel = this.getInputSelection(el)
      var val = el.value
      el.value = val.slice(0, sel.start) + text + val.slice(sel.end)
    },
    onInput (value) {
      this.number = value
    },
    onMouseUp () {
      this.selection = false
    },
    onSelect (event) {
      this.selection = true
    },
    onKeyDown (event) {
      // only single key
      if (event.key.length > 1) {
        console.log('key')
        this.selection = false
        return true
      }

      if (/[^\d]/.test(event.key)) {
        event.preventDefault()
        this.selection = false
        return false
      }
      let keyString = `${event.key}`
      let number = parseInt(this.number)
      let s = this.selection ? 'sel' : 'nosel'
      number = isNaN(number) ? 0 : number
      let numberString = number > 0 ? `${number}` : ''
      if (numberString === '' && keyString === '0') {
        event.preventDefault()
        this.selection = false
        return false
      }
      numberString = numberString + keyString
      console.log({l: numberString.length, n: numberString, s: s})
      if (numberString.length > 3) {
        if (s === 'sel') {
          let range = document.getSelection().getRangeAt(0)
          console.log(range)
          let lr = document.createRange()
          lr.selectNodeContents(event.target)
          console.log(lr)
          event.preventDefault()
          this.selection = false
          return true
        } else {
          event.preventDefault()
          this.selection = false
          return false
        }
      } else {
        if (numberString.length === 3 && (parseInt(numberString) > 300)) {
          if (s === 'sel') {
            this.selection = false
            return true
          } else {
            event.preventDefault()
            this.selection = false
            return false
          }
        }
        this.selection = false
        return true
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
