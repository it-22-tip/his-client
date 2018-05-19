import { extend } from 'lodash'
const paginated = {
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
      default: 'Name'
    }
  },
  data () {
    return {
      total: 0,
      totalPage: 1,
      activePage: 1,
      activeSort: 'Name',
      activeOrder: 'asc'
    }
  },
  methods: {
    changePage (change) {
      let { name, params } = this.$route
      let newParams = extend({}, params, change)
      if (newParams === params) return
      this.$router.push(
        {
          name: name,
          params: newParams
        }
      )
      let { page, sort, order } = newParams
      this.activePage = parseInt(page)
      this.activeSort = sort
      this.activeOrder = order
      this.populate()
    }
  }
}

export default paginated
