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

/* routes.beforeEach((to, from, next) => {
  console.log(to)
  next()
}) */

/* routes.beforeEach((to, from, next) => {
  if (to.meta !== undefined && to.meta.login !== undefined) {
    const { isLoggedIn } = Store.state.Users
    if (isLoggedIn === false) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

routes.beforeEach((to, from, next) => {
  if (to.name === 'base.login') {
    Store.commit('Users/LOGOUT')
  }
  next()
})

routes.beforeEach((to, from, next) => {
  if (to.meta !== undefined && to.meta.title !== undefined) {
    // document.title = 'Hospital Information System' + ' | ' + to.meta.title
    document.title = to.fullPath
    // console.log(to)
  }
  next()
}) */

export default routes
