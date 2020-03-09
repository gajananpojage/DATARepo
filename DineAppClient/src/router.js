import Vue from 'vue'
import Router from 'vue-router'
import Onboarding from './views/Onboarding.vue'
import Reconciliation from './views/Reconciliation.vue'
import JobResults from './views/JobResults.vue'
import DataProfiling from './views/DataProfiling.vue'
import Validation from './views/Validation.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'onboarding',
      component: Onboarding
    },
    {
      path: '/reconciliation',
      name: 'reconciliation',
      component: Reconciliation
    },
    {
      path: '/results',
      name: 'results',
      component: JobResults
    },
    {
      path: '/profiling',      
      name: 'profiling',
      component: DataProfiling
    },
    {
      path: '/validation',
      name: 'validation',
      component: Validation
    }
    ]
})
