<script>
  'use-strict'
  import Vue from 'vue'
  const MdButton = Vue.component('MdButton')
  export default {
    name: 'BaseButton',
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
    render (createElement) {
      const options = {
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
      const button = createElement('md-button', options, [this.$slots.default])
      return button
    },
    methods: {
      onFocus () {
        this.$children[0].mdHasFocus = true
      },
      onBlur () {
        this.$children[0].mdHasFocus = false
      }
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
