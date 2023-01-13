import Vuex from 'vuex'

import auth from '~/store/modules/auth'
import riddle from '~/store/modules/riddle'
import solution from '~/store/modules/solution'

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
      riddle,
      solution
    }
  })
}

export default createStore
