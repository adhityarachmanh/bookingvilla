// https://vuex.vuejs.org/en/mutations.html

export default {
  setAdmin(state, payload) {
    state.admin = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setError(state, payload) {
    state.error = {
      status: true,
      msg: payload
    }
  },
  clearError(state) {
    state.error = {
      status: false,
      msg: null
    }
  }
}
