const Employees = [
  {
    path: '/employees/employee',
    component: () => import('@pages/employees/employees-tab'),
    children: [
      {
        path: '',
        name: 'employees.employee.list',
        component: () => import('@pages/employees/employee-list'),
        meta: {
          title: 'Employees',
          login: true
        }
      },
      {
        path: '/employees/jobtitle',
        name: 'employees.jobtitle.list',
        component: () => import('@pages/employees/jobtitle-list'),
        meta: {
          title: 'Employee Job Titles',
          login: true
        }
      },
      {
        path: '/employees/license',
        name: 'employees.license.list',
        component: () => import('@pages/employees/license-list'),
        meta: {
          title: 'Employee Licenses',
          login: true
        }
      }
    ]
  },
  {
    path: '/employees/employee/:employeeId',
    component: () => import('@pages/employees/employee-detail-tab'),
    props: true,
    meta: {
      title: 'Employees Details Personal',
      login: true
    },
    children: [
      {
        path: '',
        name: 'employees.employee.detail.personal',
        component: () => import('@pages/employees/employee-detail-personal'),
        props: true,
        meta: {
          title: 'Employees Details Personal',
          login: true
        }
      },
      {
        path: '/employees/employee/:employeeId/license',
        name: 'employees.employee.detail.license',
        component: () => import('@pages/employees/employee-detail-license'),
        props: true,
        meta: {
          title: 'Employees Details License',
          login: true
        }
      }
    ]
  },
  {
    path: '/employees/license/:employeeId/edit-address',
    name: 'employees.edit.address',
    component: () => import('@pages/employees/employee-edit-address'),
    meta: {
      title: 'Edit Address',
      login: true
    }
  }
]

export default Employees
