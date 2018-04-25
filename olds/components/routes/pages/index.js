const Pages = [
  {
    path: '/page/dashboard',
    name: 'page.dashboard',
    component: () => import('./dashboard.vue')
  },
  {
    path: '/page/login',
    name: 'page.login',
    component: () => import('./login.vue')
  }
]

export default Pages
