<template>
  <layout-one>
    <md-tabs>
      <md-tab md-label="Personal"/>
      <md-tab md-label="Alamat"/>
      <md-tab md-label="Ok"/>
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
}
</style>

