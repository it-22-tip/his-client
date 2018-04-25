<template>
  <div class="page-container">
    <div class="page-container-header">
      <md-toolbar
        class="md-primary md-dense"
        md-elevation="0"><slot name="header" /></md-toolbar>
      <template slot-scope="toolbar"/>
    </div>
    <md-content class="page-container-content md-scrollbar">
      <div>
        <slot/>
      </div>
    </md-content>
    <slot name="footer" />
  </div>
</template>

<script>
import Vuebar from 'vuebar'
import Vue from 'vue'
Vue.use(Vuebar)
export default {
  name: 'PageContainer'
}
</script>

<style lang="scss" scoped>
  .page-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .page-container-header {
    height:48px;
    width: 100%;
  }
  .page-container-content {
    flex: 1;
    overflow: hidden;
    position: relative;
    display: flex;
  }
  .page-container-content > div {
    flex: 1;
  }
</style>
