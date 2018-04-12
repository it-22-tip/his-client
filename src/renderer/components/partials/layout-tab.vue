<template>
  <layout-one>
    <md-content>
      <md-tabs md-sync-route>
        <md-tab md-label="Icons" :to="{ name: 'example.icons' }"></md-tab>
        <md-tab md-label="Tabs" :to="{ name: 'example.tabs' }"></md-tab>
      </md-tabs>
      <md-content>
        <router-view></router-view>
      </md-content>
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
