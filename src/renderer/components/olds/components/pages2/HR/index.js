const HR = [
  {
    path: 'page/hr/employee/list',
    name: 'page.hr.employee.list',
    component: () => import('@pages/HR/List')
  },
  {
    path: 'page/hr/contract/list',
    name: 'page.hr.contract.list',
    component: () => import('@pages/HR/Contract')
  },
  {
    path: 'page/hr/education/list',
    name: 'page.hr.education/list',
    component: () => import('@pages/HR/Education')
  },
  {
    path: 'page/hr/employee/detail/:id',
    name: 'page.hr.employee.detail',
    component: () => import('@pages/HR/Detail'),
    props: true
  },
  {
    path: 'page/hr/employee/edit/:id',
    name: 'page.hr.employee.edit',
    component: () => import('@pages/HR/Edit'),
    props: true
  },
  {
    path: 'page/hr/steppers',
    name: 'page.hr.steppers',
    component: () => import('@pages/HR/Steppers')
  },
  {
    path: 'page/hr/license/list',
    name: 'page.hr.license.list',
    component: () => import('@pages/HR/License')
  }
]

export default HR
