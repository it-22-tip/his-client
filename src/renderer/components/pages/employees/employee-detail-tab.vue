<template>
  <layout-one>
    <md-tabs>
      <md-tab md-label="Personal" :to="{ name: 'employees.employee.detail.personal' }" />
      <!-- <md-tab md-label="Surat Izin" :to="{ name: 'employees.employee.detail.license' }" /> -->
    </md-tabs>
    <md-content class="ctc">
      <router-view></router-view>
    </md-content>
  </layout-one>
</template>

<script>
  export default {
    props: [
      'employeeId'
    ],
    components: {
      'layout-one': () => import('@partials/layout-one')
    }
  }
</script>

<style lang="scss" scoped>
.ctc {
  flex: 1;
}
</style>

