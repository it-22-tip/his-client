const Employees = [
  {
    path: '/employees/employee/:page/:order?/:sort?',
    props: route => {
      const { page, order, name } = route
      return { page, order, name }
    },
    component: () => import('@pages/employees/tab'),
    children: [
      {
        path: '',
        name: 'employees.employee.list',
        props: route => {
          const { page, order, name } = route
          return { page, order, name }
        },
        component: () => import('@pages/employees/list'),
        meta: {
          title: 'Employees',
          login: true
        }
      },
      {
        path: '/employees/license/:page/:order?/:sort?',
        name: 'employees.license.list',
        props (route) {
          let { page, order, name } = route
          page = parseInt(page)
          page = isNaN(page) ? 1 : page
          return { page, order, name }
        },
        component: () => import('@pages/employees/license/list'),
        meta: {
          title: 'Employee Licenses',
          login: true
        }
      }
    ]
  },
  {
    path: '/employees/detail/:employeeId',
    name: 'employee.detail',
    component: () => import('@pages/employees/detail'),
    props: true,
    meta: {
      title: 'Employees Details Personal',
      login: true
    }
  },
  {
    path: '/employees/new',
    name: 'employee.new',
    component: () => import('@pages/employees/new'),
    meta: {
      title: 'Employees New',
      login: true
    }
  }
]

export default Employees
