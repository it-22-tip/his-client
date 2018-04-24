const Employees = [
  {
    path: '/employees/employee/:page/:order?/:sort?',
    props: true,
    component: () => import('@pages/employees/employees-tab'),
    children: [
      {
        path: '',
        name: 'employees.employee.list',
        props: true,
        component: () => import('@pages/employees/employee-list'),
        meta: {
          title: 'Employees',
          login: true
        }
      },
      {
        path: '/employees/jobtitle/:page/:order?/:sort?',
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
    path: '/employee/:employeeId',
    name: 'employee.detail',
    component: () => import('@pages/employees/employee-detail-personal'),
    props: true,
    meta: {
      title: 'Employees Details Personal',
      login: true
    }
  },
  {
    path: '/employee/new',
    name: 'employee.new',
    component: () => import('@pages/employees/employee-new'),
    meta: {
      title: 'Employees New',
      login: true
    }
  }
]

export default Employees
