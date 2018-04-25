<template>
  <app-wrapper>
    <page-container>
      <template slot="header">
        <h3
          class="md-title"
          style="flex: 1">Title</h3>
        <menu-feature/>
      </template>
      <div
        slot="default"
        class="test"/>
      <page-footer slot="footer">
        <div>FOOTER</div>
      </page-footer>
    </page-container>
  </app-wrapper>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    employee () {
      return this.$store.getters['ModelInfos/getCountByName']('Employees')
      // return this.$store.state.Employee
    }
  },
  mounted () {
    // console.log(this)
    // console.log(this.$store.state.table)
  },
  methods: {
    add () {
      this.$store.dispatch('ModelInfos/INCREASE_COUNT', { table: 'Employees'})
    },
    remove () {
      this.$store.dispatch('ModelInfos/DECREASE_COUNT', { table: 'Employees' })
    },
    sync () {
      this.$store.dispatch('ModelInfos/SYNC_TABLE', { table: 'Employees' })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
