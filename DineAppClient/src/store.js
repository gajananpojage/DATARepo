import Vue from 'vue'
import Vuex from 'vuex'
//import * as types from './mutation-types'
//import PostService from '@/services/PostService'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

// initial state
const state = {

}
// getters
const getters = {

}
// actions
const actions = {

}

// mutations
const mutations = {

}
// one store for entire application
export default new Vuex.Store({
  state,
  strict: debug,
  getters,
  actions,
  mutations
})
