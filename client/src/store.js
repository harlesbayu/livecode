import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
// import { promises, stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userEmail: '',
    isLogin: false
  },
  mutations: {
    getIsLogin: function(state, payload) {
      state.isLogin = payload
    },
    getUserEmail: function (state, payload) {
      state.userEmail = payload
    }
  },
  actions: {
    setIslogin: function ({commit, dispatch}, payload) {
      let token = localStorage.getItem('token')
      if(token) {
        commit('getIsLogin', true)
      } else {
        commit('getIsLogin', false)
      }
    },
    setUserEmail: function ({commit, dispatch}, payload) {
      let email = localStorage.getItem('email')
      commit('getUserEmail', email)
    },
    findOneQuestion: function ({commit, dispatch}, payload) {
      // return new Promise(function(resolve, reject) {
      //   axios({
      //     method: 'get',
      //     url: `${config.port}/questions/findQuestionUser/${payload}`
      //   })
      //   .then(function (response){
      //     resolve(response.data.questions)
      //   })
      //   .catch(function (err){
      //     console.log(err.response)
      //   })
      // })
    }
  }
})

