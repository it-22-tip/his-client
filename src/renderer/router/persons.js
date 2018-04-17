const Persons = [
  {
    path: '/persons/:personId/edit-address',
    name: 'persons.edit.address',
    component: () => import('@pages/persons/edit-address'),
    props: true,
    meta: {
      title: 'Edit Address',
      login: true
    }
  }
]

export default Persons
