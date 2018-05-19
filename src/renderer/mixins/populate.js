const populate = {
  methods: {
    async populate () {
      let data
      this.$connection = (new this.$orm()).connect()
      try {
        data = await this.$connection.transaction(this.transaction)
      } catch (error) {
        console.log(error)
      } finally {
        await this.closeConnection()
      }
      const { rows, count } = data
      this.model = rows
      this.total = count
      this.totalPage = Math.ceil(count / 10)
    }
  }
}
export default populate
