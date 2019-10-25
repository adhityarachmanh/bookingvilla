// https://vuex.vuejs.org/en/getters.html

export default {
  admin(state) {
    return state.admin
  },
  loading(state) {
    return state.loading
  },
  error(state) {
    return state.error
  }
}
