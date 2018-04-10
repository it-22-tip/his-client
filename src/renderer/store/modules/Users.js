// import findOne from '@/crud/user/findOne'
// import bcrypt from 'bcryptjs'
const state = {
  isAuthenticating: false,
  isLoggedIn: !!localStorage.getItem('jwt'),
  user: JSON.parse(localStorage.getItem('usr')),
  errorMessage: null
}

const mutations = {
  LOGIN_REQUEST (state) {
    state.isAuthenticating = true
    state.errorMessage = null
  },
  LOGIN_FAILURE (state, message) {
    state.isAuthenticating = false
    state.errorMessage = message
  },
  LOGIN_SUCCESS (state, user) {
    state.user = user
    state.isLoggedIn = true
    state.isAuthenticating = false
  },
  LOGOUT (state) {
    state.isLoggedIn = false
    state.user = null
    state.errorMessage = null
  },
  AUTHORIZATION_REQUEST (state) {
    state.isAuthorized = false
    state.isAuthorizing = true
  },
  AUTHORIZATION_AUTHORIZED (state) {
    state.isAuthorized = true
    state.isAuthorizing = false
  },
  AUTHORIZATION_FAILURE (state) {
    state.isAuthorized = false
    state.isAuthorizing = false
  }
}

const actions = {
  LOGIN ({commit}, credentials) {
    console.log(credentials)
    /* const { email, key } = credentials
    return findOne({ account_name: email })
      .then(data => {
        if (!data) throw new Error('Authenctication Error')
        if (!bcrypt.compareSync(key, data.pass_key)) throw new Error('Authenctication Error')
      })
      .catch(error => {
        this.commit('Users/LOGIN_FAILURE', error)
        throw error
      }) */
  },
  LOGOUT ({commit}) {
    // localStorage.removeItem('jwt')
    // localStorage.removeItem('usr')
    commit('LOGOUT')
  }
}

const getters = {
  errorMessage (state) {
    return state.errorMessage
  },
  isLoggedIn (state) {
    return state.isLoggedIn
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
