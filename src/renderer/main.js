'use-strict'
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import material from './vue-material/src/material'
import { MdCheckbox, MdRadio, MdDrawer, MdSubheader, MdContent, MdButton, MdTable, MdTabs, MdTooltip, MdProgress, MdRipple, MdCard, MdField, MdToolbar } from './vue-material/src/components'
import VueMarkdown from 'vue-markdown'
import unhandled from 'electron-unhandled'
import moment from 'moment'
import { sync } from 'vuex-router-sync'
import '@/assets/global.scss'
/* import Mworker from '../worker/try.worker'

const mworker = new Mworker()

mworker.postMessage({ a: 1 })
mworker.onmessage = function (event) {}

mworker.addEventListener('message', (event) => console.log(event)) */

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

sync(store, router)

material(Vue)
const MdComponents = [
  MdCheckbox,
  MdRadio,
  MdDrawer,
  MdSubheader,
  MdContent,
  MdButton,
  MdTable,
  MdTabs,
  MdTooltip,
  MdProgress,
  MdRipple,
  MdCard,
  MdField,
  MdToolbar
]
MdComponents.forEach(
  MdComponent => {
    Vue.use(MdComponent)
  }
)
Vue.component('vue-markdown', VueMarkdown)

moment.locale('ID-id')
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

unhandled({
  logger: message => {
    let now = moment.now()
    console.log({ time: now, message: message })
  },
  showDialog: false
})
