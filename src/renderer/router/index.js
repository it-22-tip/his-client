import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'
import Base from './routes/base'
import Employees from './routes/employees'
import Persons from './routes/persons'
import Documents from './routes/documents'
import MasterData from './routes/masterdata'
Vue.use(Router)

const error404 = [
  {
    path: '*',
    redirect: '/'
  }
]

const routes = new Router({
  routes: [].concat(Base, Employees, Persons, Documents, MasterData, error404)
})

/* routes.beforeEach((to, from, next) => {
  console.log(to)
  next()
}) */

routes.beforeEach((to, from, next) => {
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
    console.log(to)
  }
  next()
})

export default routes
