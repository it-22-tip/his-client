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
        path: '',
        name: 'masterdata.provinces',
        component: () => import('@pages/master-data/provinces'),
        props: true,
        meta: {
          title: 'Master Provinsi',
          login: true
        }
      },
      {
        path: '',
        name: 'masterdata.regencies',
        component: () => import('@pages/master-data/regencies'),
        props: true,
        meta: {
          title: 'Master Kota/Kabupaten',
          login: true
        }
      },
      {
        path: '',
        name: 'masterdata.districts',
        component: () => import('@pages/master-data/districts'),
        props: true,
        meta: {
          title: 'Master Kecamatan',
          login: true
        }
      },
      {
        path: '',
        name: 'masterdata.villages',
        component: () => import('@pages/master-data/villages'),
        props: true,
        meta: {
          title: 'Master Kelurahan/Desa',
          login: true
        }
      },
      {
        path: '',
        name: 'masterdata.jobtitles',
        component: () => import('@pages/master-data/jobtitles'),
        props: true,
        meta: {
          title: 'Master Posisi',
          login: true
        }
      },
      {
        path: '',
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
