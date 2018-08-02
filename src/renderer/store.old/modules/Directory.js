const state = {
  selection: 0
}

const mutations = {
  INCREASE_COUNT (state) {
    console.log('one')
    ++state.selection
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
