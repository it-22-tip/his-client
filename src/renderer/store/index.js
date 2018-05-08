import Vue from 'vue'
import Vuex from 'vuex'
// import { ipcRenderer } from 'electron'

import modules from './modules'

Vue.use(Vuex)

/* const MyPlugin = function (ipcRenderer) {
  return store => {
    ipcRenderer.on('selection', (event, arg) => {
      store.commit('Directory/INCREASE_COUNT')
    })
    store.subscribe(mutation => {
      if (mutation.type === 'Directory/RECEIVE_DATA') {
        ipcRenderer.send('asynchronous-message', 'selected')
      }
    })
  }
}

const plugin = MyPlugin(ipcRenderer) */

const store = new Vuex.Store({
  modules,
  // plugins: [plugin],
  strict: process.env.NODE_ENV !== 'production'
})

export default store
