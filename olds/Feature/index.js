const Feature = [
  {
    path: '/feature/email',
    name: 'page.feature.email',
    component: () => import('@pages/Feature/Email')
  },
  {
    path: '/feature/markdown',
    name: 'page.feature.markdown',
    component: () => import('@pages/Feature/Markdown')
  },
  {
    path: '/feature/table',
    name: 'page.feature.table',
    component: () => import('@pages/Feature/Table')
  },
  {
    path: '/feature/qr',
    name: 'page.feature.qr',
    component: () => import('@pages/Feature/Qr')
  },
  {
    path: '/feature/barcode',
    name: 'page.feature.barcode',
    component: () => import('@pages/Feature/Barcode')
  },
  {
    path: '/feature/pdf',
    name: 'page.feature.pdf',
    component: () => import('@pages/Feature/Pdf')
  },
  {
    path: '/feature/pdfsave',
    name: 'page.feature.pdfsave',
    component: () => import('@pages/Feature/PdfSave')
  },
  {
    path: '/feature/mysql',
    name: 'page.feature.mysql',
    component: () => import('@pages/Feature/Mysql')
  },
  {
    path: '/feature/treeview',
    name: 'page.feature.treeview',
    component: () => import('@pages/Feature/Treeview')
  },
  {
    path: '/feature/Image',
    name: 'page.feature.image',
    component: () => import('@pages/Feature/Image')
  },
  {
    path: '/feature/Calendar',
    name: 'page.feature.calendar',
    component: () => import('@pages/Feature/Calendar')
  }
]

export default Feature
