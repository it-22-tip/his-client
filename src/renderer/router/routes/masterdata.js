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
        path: '/master-data/provinces/:page/:order/:sort',
        name: 'masterdata.provinces',
        component: () => import('@pages/master-data/provinces'),
        props: true,
        meta: {
          title: 'Master Provinsi',
          login: true
        }
      },
      {
        path: '/master-data/regencies/:page/:order/:sort',
        name: 'masterdata.regencies',
        component: () => import('@pages/master-data/regencies'),
        props: true,
        meta: {
          title: 'Master Kota/Kabupaten',
          login: true
        }
      },
      {
        path: '/master-data/jobtitles/:page/:order/:sort',
        name: 'masterdata.jobtitles',
        component: () => import('@pages/master-data/jobtitles'),
        props: true,
        meta: {
          title: 'Master Posisi',
          login: true
        }
      },
      {
        path: '/master-data/almamaters/:page/:order/:sort',
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
