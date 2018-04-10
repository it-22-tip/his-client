const state = {
  updatedAt: 0,
  Provinces: { count: 0, updatedAt: null },
  Regencies: { count: 0, updatedAt: null },
  Districts: { count: 0, updatedAt: null },
  Villages: { count: 0, updatedAt: null },
  Abilities: { count: 0, updatedAt: null },
  Roles: { count: 0, updatedAt: null },
  RoleAbilities: { count: 0, updatedAt: null },
  Users: { count: 0, updatedAt: null },
  EmployeeContractTypes: { count: 0, updatedAt: null },
  EmployeeContracts: { count: 0, updatedAt: null },
  JobTitles: { count: 0, updatedAt: null },
  EducationAlmamaters: { count: 0, updatedAt: null },
  Employees: { count: 0, updatedAt: null },
  EmployeeAttendances: { count: 0, updatedAt: null },
  EmployeeLeaveTypes: { count: 0, updatedAt: null },
  EmployeeLicenseTypes: { count: 0, updatedAt: null },
  EmployeeLicenses: { count: 0, updatedAt: null },
  DocumentCategories: { count: 0, updatedAt: null },
  Tags: { count: 0, updatedAt: null },
  DocumentTags: { count: 0, updatedAt: null },
  DocumentVersions: { count: 0, updatedAt: null },
  Documents: { count: 0, updatedAt: null }
}

const mutations = {
  DECREASE_COUNT (state, payload) {
    const { table } = payload
    if (state[table].count < 1) return
    --state[table].count
    this.commit('ModelInfos/SET_UPDATED_AT', payload)
  },
  INCREASE_COUNT (state, payload) {
    const { table } = payload
    console.log(table)
    ++state[table].count
    this.commit('ModelInfos/SET_UPDATED_AT', payload)
  },
  SET_UPDATED_AT (state, payload) {
    const {table, time} = payload
    state[table].updatedAt = time
    state.updatedAt = time
  },
  SET_COUNT (state, payload) {
    const { table, count } = payload
    state[table].count = count
    this.commit('ModelInfos/SET_UPDATED_AT', table)
  }
}

const actions = {
  DECREASE_COUNT ({ commit }, payload) {

    // commit('DECREASE_COUNT', {  })
  },
  INCREASE_COUNT ({ commit }, payload) {

    // commit('INCREASE_COUNT', payload)
  },
  SYNC_TABLE ({ commit }) {
    // const { ModelInfos } = models
    /* ModelInfos
       .sync().then(
        data => {
          console.log(data)
        }
      ) */
  }
}

const getters = {
  getCountByName: (state) => (name) => {
    return state[name]
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
