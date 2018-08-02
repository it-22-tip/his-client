import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'

const state = {
  layout: 'default'
}

const getters = {
  layout (state) {
    return state.layout
  }
}

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [pathify.plugin],
  getters,
  state,
  strict: process.env.NODE_ENV !== 'production'
})

export default store
