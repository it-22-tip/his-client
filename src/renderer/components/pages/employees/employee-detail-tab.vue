<template>
  <layout-one>
    <md-tabs>
      <md-tab
        :to="{ name: 'employees.employee.detail.personal' }"
        md-label="Personal" />
        <!-- <md-tab md-label="Surat Izin" :to="{ name: 'employees.employee.detail.license' }" /> -->
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
  props: [
    'employeeId'
  ]
}
</script>

<style lang="scss" scoped>
.ctc {
  flex: 1;
}
</style>
