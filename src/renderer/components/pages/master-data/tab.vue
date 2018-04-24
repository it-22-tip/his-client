<template>
  <layout-one>
    <md-toolbar class="md-dense md-primary" md-elevation="0">
      <md-button @click="$router.push({ name: 'base.dashboard' })" class="md-icon-button">
        <md-icon>close</md-icon>
      </md-button>
    </md-toolbar>
    <md-tabs>
      <md-tab md-label="Provinsi" :to="{ name: 'masterdata.provinces', params: { page: '1', sort: 'Name', order: 'asc' } }"/>
      <md-tab md-label="Kota/Kabupaten" :to="{ name: 'masterdata.regencies', params: { page: '1', sort: 'Name', order: 'asc' } }"/>
      <md-tab md-label="Posisi" :to="{ name: 'masterdata.jobtitles', params: { page: '1', sort: 'Name', order: 'asc' } }"/>
      <md-tab md-label="Almamater" :to="{ name: 'masterdata.almamaters' }"/>
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

