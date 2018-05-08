<template>
  <layout-one>
    <md-toolbar
      class="md-dense md-primary"
      md-elevation="0">
      <md-button
        class="md-icon-button"
        @click="$router.push({ name: 'base.dashboard' })">
        <md-icon>close</md-icon>
      </md-button>
    </md-toolbar>
    <md-tabs @md-changed="onChange">
      <md-tab
        id="1"
        :to="{ name: 'employees.employee.list', params: { page: '1', sort: 'Ein', order: 'asc' } }"
        md-label="Karyawan"/>
      <md-tab
        id="2"
        :to="{ name: 'employees.license.list', params: { page: '1', sort: 'Id', order: 'asc' } }"
        md-label="Surat Izin Kerja"/>
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
