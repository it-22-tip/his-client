<template>
  <layout-one>
    <md-tabs>
      <md-tab md-label="Provinsi" :to="{ name: 'masterdata.provinces' }"/>
      <md-tab md-label="Kota/Kabupaten" :to="{ name: 'masterdata.regencies' }"/>
      <md-tab md-label="Kecamatan" :to="{ name: 'masterdata.districts' }"/>
      <md-tab md-label="Kelurahan/Desa" :to="{ name: 'masterdata.villages' }"/>
      <md-tab md-label="Posisi" :to="{ name: 'masterdata.jobtitles' }"/>
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

