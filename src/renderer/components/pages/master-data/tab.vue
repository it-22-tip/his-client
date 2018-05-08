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
    <md-tabs>
      <md-tab
        :to="{ name: 'masterdata.provinces', params: { page: '1', sort: 'Name', order: 'asc' } }"
        md-label="Daerah"/>
      <md-tab
        :to="{ name: 'masterdata.regencies', params: { page: '1', sort: 'Name', order: 'asc' } }"
        md-label="Kota/Kabupaten"/>
      <md-tab
        :to="{ name: 'masterdata.jobtitles', params: { page: '1', sort: 'Name', order: 'asc' } }"
        md-label="Posisi"/>
      <md-tab
        :to="{ name: 'masterdata.almamaters' }"
        md-label="Almamater"/>
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
