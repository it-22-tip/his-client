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
      }
    ]
  }
]

export default Employees
