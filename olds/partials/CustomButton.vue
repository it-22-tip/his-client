<script>
'use-strict'
import Vue from 'vue'
const MdButton = Vue.component('MdButton')
export default {
  name: 'CustomButton',
  extends: MdButton,
  props: {
    'href': {
      type: String,
      default: null
    },
    'type': {
      type: String,
      default: 'button'
    },
    'disabled': {
      type: Boolean,
      default: false
    },
    'md-ripple': {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onFocus () {
      this.$children[0].mdHasFocus = true
    },
    onBlur () {
      this.$children[0].mdHasFocus = false
    }
  },
  render (createElement) {
    const attrs = {
      staticClass: 'md-custom-button',
      attrs: {
        ...this.attrs,
        disabled: this.disabled,
        type: !this.href && (this.type || 'button')
      },
      on: {
        ...this.$listeners,
        focus: this.onFocus,
        blur: this.onBlur
      }
    }
    const button = createElement('md-button', attrs, [this.$slots.default])
    return button
  }
}
</script>

<style lang="scss" scoped>
  .md-custom-button {
    border-radius: 0 !important;
  }
  /* .md-custom-button.md-button.md-theme-default.md-raised:not([disabled]).md-primary {
    color: rgba(white, .5);
  } */
</style>
