const Base = [
  {
    path: '/',
    name: 'page.base.login',
    component: () => import('@pages/Base/Login')
  },
  {
    path: '/base/dashboard',
    name: 'page.base.dashboard',
    component: () => import('@pages/Base/Dashboard')
  },
  {
    path: '/base/settings',
    name: 'page.base.settings',
    component: () => import('@pages/Base/Settings')
  }
]

export default Base
