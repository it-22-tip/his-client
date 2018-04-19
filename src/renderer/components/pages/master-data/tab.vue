<template>
  <layout-one>
    <md-tabs>
      <md-tab md-label="Alamat" :to="{ name: 'masterdata.address' }"/>
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

