import Vue from 'vue'
import Router from 'vue-router'
// import Store from '@/store'
import Home from '@components/Home'
import Login from '@components/Login'
import Dashboard from '@components/Dashboard'
import TopPanel from '@components/TopPanel'
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
    components: {
      default: Home
    }
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
    name: 'dashboard',
    components: {
      content: Dashboard,
      'top-panel': TopPanel
    },
    meta: {
      layout: Dashboard.layout
    }
  }
]

const routes = new Router({
  routes: [].concat(base)
})

export default routes
