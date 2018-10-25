import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { stat } from 'fs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    error: ''
  },
  mutations: {
    loginobj (state, payload) {
      state.token = payload
    },
    errorobj (state, payload) {
      state.error = payload
    }
  },
  actions: {
    loginobj (context, payload) {
      axios({
        method: 'POST',
        url: 'http://localhost:3001/users/login',
        data: payload
      })
        .then(user => {
          localStorage.setItem('token', user.data.token)
          context.commit('loginobj', user.data.token)
          context.commit('errorobj', '')
        })
        .catch(err => {
          console.log('ERROR', err.response.data)
          context.commit('loginobj', '')
          context.commit('errorobj', err.data.response)
        })
    },
    logoutobj (context, payload) {
      localStorage.removeItem('token')
      context.commit('loginobj', '')
      context.commit('errorobj', '')
    }
  }
})
