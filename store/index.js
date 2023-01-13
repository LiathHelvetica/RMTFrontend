import Vuex from 'vuex'

import auth from '~/store/modules/auth'
import riddle from '~/store/modules/riddle'

const createStore = () => {
  return new Vuex.Store({
    state () {
      return {
      }
    },
    getters: {
    },
    mutations: {
    },
    modules: {
      auth,
      riddle
    }
  })
}

export default createStore
