export default {
  components: {
    'pagination': () => import('@partials/pagination')
  },
  props: {
    page: {
      type: Number,
      default: 1
    },
    order: {
      type: String,
      default: 'asc'
    },
    sort: {
      type: String,
      default: ''
    }
  },
  methods: {
    dataOrder () {

    },
    sortFunction (value) {
      return value.sort(() => { return -1 })
    },
    change (page, sort, order) {
      let name = ''
      let params = { page: page, sort: sort, order: order }
      let options = { name: name, params: params }
      this.$router.push(options)
    },
    mapper (row) {
      return {
        Ein: row.Id,
        Name: row.Person.Name,
        Age: row.Person.Age,
        Gender: row.Person.Gender,
        JobTitle: (row.JobTitle !== null) ? row.JobTitle.Name : null
      }
    }
  }
}
