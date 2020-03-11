import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import jobs from './data/jobsListStore.json';
import validations from './data/validationListStore.json';
import profiles from './data/profileListStore.json'
//import PostService from '@/services/PostService'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

// initial state
const state = {
  jobId: 1,
  allJobs: [],
  allValidationRules: [],
  allProfiles: [],
  activeItemId:''
}
// getters
const getters = {
  allJobs: state => state.allJobs,
  allValidationRules: state => state.allValidationRules,
  allProfiles: state => state.allProfiles,
}
// actions
const actions = {
  addJob({ commit }, job) {
    commit(types.ADD_JOB, {
      job
    })   
  },
  addValidation({ commit }, value){
    commit('addValidation',value)
  },
  addProfile({ commit }, value){
     commit('addProfile',value)
  },
  incrementJobId (context) {
    context.commit('incrementJobId')
  },
  setJobs(context){
    context.commit('setJobs')
  },
  setValidations(context) {
    context.commit('setValidations')
  },
  setProfiles(context) {
    context.commit('setProfiles')
  },
  setActiveItem({ commit }, value){
    commit('setActiveItem',value)
  },
  unsetActiveItem(context){
    context.commit('unsetActiveItem')
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
    },
    setValidations(state) {
      state.allValidationRules=validations;
    },
    setProfiles(state) {
      state.allProfiles=profiles;
    },
    addValidation(state, obj) {
      state.allValidationRules.push(obj)
    },    
    addProfile(state, obj) {
      state.allProfiles.push(obj)
    },
    setActiveItem(state,value) {
      state.activeItemId=value;
    },
    unsetActiveItem(state){
      state.activeItemId= '';
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
