const state = (() => {})()
const getters = {}
const mutations = {}
const actions = {
  async answer (context, payload) {
    await this.$axios
      .post(`/answer/${payload.id}`, payload.payload, { headers: { 'Authorization': localStorage.getItem('token'), 'Content-Type': 'application/json', 'Csrf-Token': 'nocheck' } })
      .then((response) => {
        console.log(response.data)
        return response.data
      })
  },
}

export default {
  getters,
  state,
  mutations,
  actions
}
