const state = (() => {})()
const getters = {}
const mutations = {}
const actions = {
  async login (context, payload) {
    await this.$axios
      .post('login', payload, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        localStorage.setItem('token', response.headers.authorization)
      })
  },
  async register (context, payload) {
    await this.$axios
      .post('user', payload)
  },
  async getMyData () {
    return await this.$axios
      .get('me', { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
        return response.data
      })
  }
}

export default {
  getters,
  state,
  mutations,
  actions
}
