const MasterData = [
  {
    path: '/master-data/tabs',
    component: () => import('@pages/master-data/tab'),
    props: true,
    meta: {
      title: 'Master Data',
      login: true
    },
    children: [
      {
        path: '/master-data/address',
        name: 'masterdata.address',
        component: () => import('@pages/master-data/address'),
        props: true,
        meta: {
          title: 'Master Provinsi',
          login: true
        }
      },
      {
        path: '/master-data/jobtitles',
        name: 'masterdata.jobtitles',
        component: () => import('@pages/master-data/jobtitles'),
        props: true,
        meta: {
          title: 'Master Posisi',
          login: true
        }
      },
      {
        path: '/master-data/almamaters',
        name: 'masterdata.almamaters',
        component: () => import('@pages/master-data/almamaters'),
        props: true,
        meta: {
          title: 'Master Almamater',
          login: true
        }
      }
    ]
  }
]

export default MasterData
