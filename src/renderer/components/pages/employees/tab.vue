<template>
  <layout-one>
    <md-toolbar class="md-dense md-primary" md-elevation="0">
      <md-button class="md-icon-button" @click="$router.push({ name: 'base.dashboard' })">
        <md-icon>close</md-icon>
      </md-button>
    </md-toolbar>
    <md-tabs :md-sync-route="true" :md-changed="test">
      <md-tab id="one" md-label="Karyawan" :to="{ name: 'employees.employee.list', params: { page: '1', sort: 'Ein', order: 'asc' } }"/>
      <md-tab id="two" md-label="Posisi" :to="{ name: 'employees.jobtitle.list', params: { page: '1', sort: 'Name', order: 'asc' } }"/>
    </md-tabs>
    <md-content class="ctc">
      
      [a]
    </md-content>
  </layout-one>
</template>

<script>
  export default {
    components: {
      'layout-one': () => import('@partials/layout-one')
    },
    data () {
      return {
        pageTitle: null
      }
    },
    methods: {
      test ($event) {
        console.log($event)
      }
    }
  }
</script>

<style lang="scss" scoped>
.ctc {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>

