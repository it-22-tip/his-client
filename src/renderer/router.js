import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'
Vue.use(Router)

const error404 = [
  {
    path: '*',
    redirect: '/'
  }
]

const base = [
  {
    path: '/',
    name: 'base.index',
    redirect: {
      name: 'base.login'
    }
  },
  {
    path: '/intro',
    name: 'base.intro',
    component: () => import('@pages/base/intro')
  },
  {
    path: '/printer',
    name: 'base.printer',
    component: () => import('@pages/base/printer'),
    meta: {

    }
  },
  {
    path: '/icon',
    name: 'base.icon',
    component: () => import('@pages/base/icon'),
    meta: {

    }
  },
  {
    path: '/install',
    name: 'base.install',
    component: () => import('@pages/base/install'),
    meta: {
    }
  },
  {
    path: '/login',
    name: 'base.login',
    component: () => import('@pages/base/login'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/dashboard',
    name: 'base.dashboard',
    component: () => import('@pages/base/dashboard'),
    meta: {
      title: 'Dashboard',
      login: true
    }
  },
  {
    path: '/employees/employee',
    name: 'employees.employee.list',
    component: () => import('@pages/employees/employee-list'),
    meta: {
      title: 'Employees',
      login: true
    }
  },
  {
    path: '/employees/employee/:employeeId',
    name: 'employees.employee.detail',
    component: () => import('@pages/employees/employee-detail'),
    props: true,
    meta: {
      title: 'Employees Details',
      login: true
    }
  },
  {
    path: '/employees/jobtitle',
    name: 'employees.jobtitle.list',
    component: () => import('@pages/employees/jobtitle-list'),
    meta: {
      title: 'Employee Job Titles',
      login: true
    }
  },
  {
    path: '/employees/jobtitle/:jobtitleId',
    name: 'employees.jobtitle.detail',
    component: () => import('@pages/employees/jobtitle-detail'),
    props: true,
    meta: {
      title: 'Employee Job Title Details',
      login: true
    }
  },
  {
    path: '/employees/license',
    name: 'employees.license.list',
    component: () => import('@pages/employees/license-list'),
    meta: {
      title: 'Employee Licenses',
      login: true
    }
  },
  {
    path: '/documents/document',
    name: 'documents.document.list',
    component: () => import('@pages/documents/document-list'),
    meta: {
      title: 'Documents',
      login: true
    }
  }
]

const routes = new Router({
  routes: [].concat(base, error404)
})

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
    document.title = 'Hospital Information System' + ' | ' + to.meta.title
  }
  next()
})

export default routes
