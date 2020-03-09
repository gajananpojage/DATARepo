import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import jobs from './jobsList.json'
//import PostService from '@/services/PostService'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

// initial state
const state = {
  jobId: 1,
  allJobs: [],
}
// getters
const getters = {
  allJobs: state => state.allJobs,
}
// actions
const actions = {
  addJob({ commit }, job) {
    commit(types.ADD_JOB, {
      job
    })   
  },
  incrementJobId (context) {
    context.commit('incrementJobId')
  },
  setJobs(context){
    context.commit('setJobs')
  }
}

// mutations
const mutations = {
  [types.ADD_JOB](state, { job }) {
      state.allJobs.push(job)
    },
    incrementJobId(state) {
      state.jobId++
    },
    setJobs(state) {
      state.allJobs=jobs;
    }
  }
// one store for entire application
export default new Vuex.Store({
  state,
  strict: debug,
  getters,
  actions,
  mutations
})
