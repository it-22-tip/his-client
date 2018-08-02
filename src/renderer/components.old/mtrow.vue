<script>
import Vue from 'vue'
const MdTableRow = Vue.component('MdTableRow')
export default {
  name: 'Mtrow',
  extends: MdTableRow,
  mounted () {
    console.log(this.$attrs)
  }/* ,
  render (createElement) {
    const options = {
      attrs: {
        ...this.attrs
      }
    }
    const row = createElement('md-table-row', options, [this.$slots.default])
    return row
  } */
}
</script>
