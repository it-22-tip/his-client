const Install = [
  {
    path: 'page/install/database',
    name: '',
    component: () => import('@pages/Install/Install'),
    children: [
      {
        path: '',
        name: 'page.install.database',
        component: () => import('@pages/Install/Database')
      },
      {
        path: 'page/install/table',
        name: 'page.install.table',
        component: () => import('@pages/Install/Table')
      },
      {
        path: 'page/install/image',
        name: 'page.install.image',
        component: () => import('@pages/Install/Image')
      }
    ]
  }
]

export default Install
