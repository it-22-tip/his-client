'use-strict'
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import VueMaterial from './vue-material/src/index'
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
Vue.use(VueMaterial)
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
