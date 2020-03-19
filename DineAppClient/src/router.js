import Vue from 'vue'
import Router from 'vue-router'
import Onboarding from './views/Onboarding.vue';
import OnboardingApplication from "./components/Onboarding/OnboardingApplication";
import ApplicationList from "./components/Onboarding/ApplicationList";

import Reconciliation from './views/Reconciliation.vue';
import CreateJob from './components/Job/CreateJob';
import ListJob from './components/Job/ListJob';
import ResultJob from './components/Job/ResultJob';

import Validation from './views/Validation.vue';
import CreateValidation from './components/Validation/CreateValidation';
import ListValidation from './components/Validation/ListValidation';
import ResultValidation from './components/Validation/ResultValidation';

import DataProfiling from './views/DataProfiling.vue';
import CreateProfile from './components/Profile/CreateProfile';
import ListProfile from './components/Profile/ListProfile';
import ResultProfile from './components/Profile/ResultProfile';

import Output from './components/Output';
import Login from "./views/Login";
import Approval from "./views/Approval";


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/approval',
      name: 'approval',
      component: Approval
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: Onboarding,
      children: [
        {
          path: "",
          component: OnboardingApplication
        },
        {
          path: "list",
          component: ApplicationList
        }
      ]
    },
    {
      path: '/reconciliation',
      name: 'reconciliation',
      component: Reconciliation,
      children: [
        {
          path: "",
          component: CreateJob
        },
        {
          path: "list",
          component: ListJob
        },
        {
          path: "result",
          component: ResultJob
        },
        {
          path: "output",
          component: Output
        }
      ]
    },
    {
      path: '/profiling',
      name: 'profiling',
      component: DataProfiling,
      children: [
        {
          path: "",
          component: CreateProfile
        },
        {
          path: "list",
          component: ListProfile
        },
        {
          path: "result",
          component: ResultProfile
        },
        {
          path: "output",
          component: Output
        }
      ]
    },
    {
      path: '/validation',
      name: 'validation',
      component: Validation,
      children: [
        {
          path: "",
          component: CreateValidation
        },
        {
          path: "list",
          component: ListValidation
        },
        {
          path: "result",
          component: ResultValidation
        },
        {
          path: "output",
          component: Output
        }
      ]
    }
    ]
})
