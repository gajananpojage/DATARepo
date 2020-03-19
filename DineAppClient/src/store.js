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
  appDataList: [],
  allValidationRules: [],
  allProfiles: [],
  activeItemId:'',
  allConnections: [],
  applicationList: [],
}
// getters
const getters = {
  allJobs: state => state.allJobs,
  appDataList: state => state.appDataList,
  allValidationRules: state => state.allValidationRules,
  allProfiles: state => state.allProfiles,
  allConnections: state=>state.allConnections,
  applicationList: state=> state.applicationList
}
// actions
const actions = {
  addJob({ commit }, job) {
    commit(types.ADD_JOB, {
      job
    })
  },
  onboardApp({commit}, value) {
    commit('onboardApp', value)
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
  },
  setConnections(context){
    context.commit('setConnections');
  },
  addConnection({commit},value){
    commit('addConnection',value)
  },
  addApplication({commit},value){
    commit('addApplication',value)
  }
}

// mutations
const mutations = {
  [types.ADD_JOB](state, { job }) {
      state.allJobs.unshift(job)
    },
  onboardApp(state, obj) {
    state.appDataList.unshift(obj)
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
      state.allValidationRules.unshift(obj)
    },
    addProfile(state, obj) {
      state.allProfiles.unshift(obj)
    },
    setActiveItem(state,value) {
      state.activeItemId=value;
    },
    unsetActiveItem(state){
      state.activeItemId= '';
    },
    setConnections(state) {
      state.allConnections=["Hive RDS", "ADLS RDS"];
    },
    addConnection(state,obj){
      state.allConnections.unshift(obj)
    },
    addApplication(state,obj){
      state.applicationList.unshift(obj)
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
