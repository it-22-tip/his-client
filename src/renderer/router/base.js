const Base = [
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
    path: '/documents/document',
    name: 'documents.document.list',
    component: () => import('@pages/documents/document-list'),
    meta: {
      title: 'Documents',
      login: true
    }
  }
]
export default Base
