<template>
  <layout-one>
    <md-toolbar class="md-dense" md-elevation="0">
      {{ pageTitle }}
    </md-toolbar>
    <md-tabs>
      <md-tab md-label="Karyawan" :to="{ name: 'employees.employee.list', params: { page: '1', sort: 'Id', order: 'asc' } }"/>
      <md-tab md-label="Posisi" :to="{ name: 'employees.jobtitle.list' }"/>
      <md-tab md-label="Surat Izin Kerja" :to="{ name: 'employees.license.list' }"/>
      <!-- <md-tab md-label="Kontrak"/> -->
    </md-tabs>
    <md-content class="ctc">
      <router-view></router-view>
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
    mounted () {

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

