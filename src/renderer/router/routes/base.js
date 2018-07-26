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
    path: '/settings',
    name: 'base.settings',
    component: () => import('@pages/base/settings'),
    meta: {
      title: 'Settings'
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
    path: '/ocr',
    name: 'base.ocr',
    component: () => import('@pages/base/ocr'),
    meta: {
      title: 'OCR',
      login: true
    }
  },
  {
    path: '/directory',
    name: 'base.directory',
    component: () => import('@pages/base/directory'),
    meta: {
      title: 'Directory'
    }
  },
  {
    path: '/tree/:num',
    name: 'base.tree',
    component: () => import('@pages/data/process'),
    props: true,
    meta: {
      title: 'Tree'
    }
  }
]
export default Base
