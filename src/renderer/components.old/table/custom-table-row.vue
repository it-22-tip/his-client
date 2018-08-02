<script>
import Vue from 'vue'
const MdTableRow = Vue.component('MdTableRow')
export default {
  name: 'CustomTable',
  extends: MdTableRow,
  mounted () {
    console.log(this.$attrs)
  }
}
</script>
