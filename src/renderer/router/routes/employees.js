const Employees = [
  {
    path: '/employees/employee/:page/:order?/:sort?',
    props: true,
    component: () => import('@pages/employees/tab'),
    children: [
      {
        path: '',
        name: 'employees.employee.list',
        props: true,
        component: () => import('@pages/employees/list'),
        meta: {
          title: 'Employees',
          login: true
        }
      },
      {
        path: '/employees/license/:page/:order?/:sort?',
        name: 'employees.license.list',
        props: true,
        component: () => import('@pages/employees/license-list'),
        meta: {
          title: 'Employee Licenses',
          login: true
        }
      }
    ]
  },
  {
    path: '/employee/:employeeId',
    name: 'employee.detail',
    component: () => import('@pages/employees/detail'),
    props: true,
    meta: {
      title: 'Employees Details Personal',
      login: true
    }
  },
  {
    path: '/employee/new',
    name: 'employee.new',
    component: () => import('@pages/employees/new'),
    meta: {
      title: 'Employees New',
      login: true
    }
  }
]

export default Employees
