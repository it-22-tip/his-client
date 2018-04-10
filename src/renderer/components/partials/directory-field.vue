<script>
  'use-strict'
  import Vue from 'vue'
  const MdField = Vue.component('MdField')
  export default {
    name: 'DirectoryInput',
    extends: MdField,
    render (createElement) {
      const options = {
      }
      const field = createElement('md-field', options, [this.$slots.default])
      return field
    }
  }
</script>

