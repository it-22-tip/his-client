<template>
<layout-one>
  <md-content class="db">
    <md-content class="db-main">
      <md-content class="db-main-tabs">
        <md-tabs md-sync-route>
          <md-tab id="tab-database" md-label="Data Base" :to="{ name: 'page.install.database'}"/>
          <md-tab id="tab-table" md-label="Table" :to="{ name: 'page.install.table'}"/>
        </md-tabs>
        <md-content class="db-main-tabs-content md-scrollbar">
          <router-view></router-view>
        </md-content>
      </md-content>
    </md-content>
  </md-content>
</layout-one>
</template>

<style lang="scss" scoped>
  .db {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
  }
  .db > .db-main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .db-main > .md-content {
    flex: 1;
  }
  .db-main-tabs {
    display: flex;
    flex-direction: column;
  }
  .db-main-tabs > .md-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .db-main-tabs-content {
    flex: 1;
  }
  .db-main-button {
    color: white;
  }
</style>

<script>
export default {
  components: {
    'layout-one': () => import('@partials/layout-one')
  }
}
</script>
