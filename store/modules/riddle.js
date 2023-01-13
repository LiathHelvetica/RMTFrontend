const state = (() => {})()
const getters = {}
const mutations = {}
const actions = {
  async getRiddle (context, id) {
    return await this.$axios
      .get(`riddle/${id}`)
      .then((response) => {
        return response.data
      })
  },
  async getMyRiddle (context, id) {
    return await this.$axios
      .get(`my-riddle/${id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
        return response.data
      })
  },
  async postStringAnswerRiddle(context, payload) {
    return await this.$axios
      .post('riddle', payload, {
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json',
          'Csrf-Token': 'nocheck'
        }
      })
      .then((response) => {
        return response.data
      })
  },
  async getRiddles(context, params) {
    return await this.$axios
      .get('riddles', { params })
      .then((response) => {
        return response.data
      })
  },
  async deleteRiddle(context, id) {
    return await this.$axios
      .delete(`riddle/${id}`, { headers: { 'Authorization': localStorage.getItem('token'), 'Content-Type': 'application/json', 'Csrf-Token': 'nocheck' } })
  },
  async updateRiddle(context, data) {
    return await this.$axios
      .put(`/riddle/${data.id}`, data.payload, { headers: {
        'Authorization': localStorage.getItem('token'), 'Content-Type': 'application/json', 'Csrf-Token': 'nocheck'
      } })
  },
  async getMyRiddles(context, params) {
    return await this.$axios
      .get('/me/riddles', { headers: { 'Authorization': localStorage.getItem('token') }, params })
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
