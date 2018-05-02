<script>
'use-strict'
import Vue from 'vue'
// import VueMaterial from 'vue-material'
import { MdButton } from 'vue-material/dist/components/MdButton'
// Vue.component(MdButton)
Vue.use(MdButton)
export default {
  name: 'BaseButton',
  created () {

  },
  template: `
    <div>
      <md-button>1</md-button>
    </div>
  `
}
</script>
