<template>
  <layout-one>
    <md-tabs>
      <md-tab md-label="Karyawan" :to="{ name: 'employees.employee.list' }"/>
      <md-tab md-label="Posisi" :to="{ name: 'employees.jobtitle.list' }"/>
      <md-tab md-label="Surat Izin Kerja" :to="{ name: 'employees.license.list' }"/>
      <md-tab md-label="Kontrak"/>
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

