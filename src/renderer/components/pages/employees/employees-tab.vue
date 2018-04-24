<template>
  <layout-one>
    <md-toolbar class="md-dense md-primary" md-elevation="0">
      {{ pageTitle }}
    </md-toolbar>
    <md-tabs @md-changed="onChange">
      <md-tab id="1" md-label="Karyawan" :to="{ name: 'employees.employee.list', params: { page: '1', sort: 'Ein', order: 'asc' } }"/>
      <md-tab id="2" md-label="Posisi" :to="{ name: 'employees.jobtitle.list', params: { page: '1', sort: 'Name', order: 'asc' } }"/>
    </md-tabs>
    <md-content class="ctc">
      <router-view/>
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
      onChange ($event) {
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

