import Vue from 'vue'
import Router from 'vue-router'
// import Store from '@/store'

import Dashboard from '@components/Dashboard'
import TopPanel from '@components/TopPanel'
import Login from '@pages/Login'
import SubOne from '@pages/SubOne'
import SubTwo from '@pages/SubTwo'
import SubThree from '@pages/SubThree'
Vue.use(Router)

const base = [
  {
    path: '*',
    name: 'notfound',
    redirect: '/'
  },
  {
    path: '/',
    name: 'home',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: Login
    }
  },
  {
    path: '/dashboard',
    components: {
      content: Dashboard,
      'top-panel': TopPanel
    },
    meta: {
      layout: Dashboard.layout
    },
    children: [
      {
        path: '',
        name: 'subone',
        components: {
          'top-panel': TopPanel,
          'sub-page': SubOne
        }
      },
      {
        path: 'subtwo',
        name: 'subtwo',
        components: {
          'top-panel': TopPanel,
          'sub-page': SubTwo
        }
      },
      {
        path: 'subthree',
        name: 'subthree',
        components: {
          'top-panel': TopPanel,
          'sub-page': SubThree
        }
      }
    ]
  }
]

const routes = new Router({
  routes: [].concat(base)
})

export default routes
