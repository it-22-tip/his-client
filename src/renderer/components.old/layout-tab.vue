<template>
  <md-content class="wrapper layout-tab">
    <md-content class="right">
      <md-content class="right-top">
        <mtoolbar/>
      </md-content>
      <md-content class="right-bottom">
        <md-content class="padding-10">
          <md-toolbar
            class="md-dense md-primary layout-tab-toolbar"
            md-elevation="0">
            <md-button
              class="md-icon-button"
              @click="$router.push({ name: 'base.dashboard' })">
              <md-icon>close</md-icon>
            </md-button>
          </md-toolbar>
          <slot/>
        </md-content>
      </md-content>
    </md-content>
  </md-content>
</template>

<script>
export default {
  components: {
    'mtoolbar': () => import('@components/app-toolbar')
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    flex-direction: row;
    position: relative;
    height: 100vh;
    width: 100vw;
  }
  .left {
    width: 0px;
    height: 100vh;
    background: pink;
  }
  .right {
    flex: 1;
    flex-direction: column;
    display: flex;
    height: 100vh;
  }
  .left-content {
    height: 100vh;
    width: 250px;
    position: relative;
  }
  .right-top {
    height: 48px;
    width: 100%;
    background-color: grey;
  }
  .right-bottom {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: grey
  }
  .padding-10 {
    padding: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    background: grey;
  }
  .right-table {
    height: 100% !important;
    display: flex;
    flex-direction: column;
  }
  .right-table .md-table-content {
    display: flex;
    flex: 1;
    overflow-y: scroll !important;
    height: 100% !important;
    max-height: none !important;
  }
  .layout-tab-toolbar.md-primary {
    background: rgb(235,111,165); /* Old browsers */
    background: -moz-linear-gradient(-45deg, rgba(235,111,165,1) 0%, rgba(255,153,153,1) 50%, rgba(232,46,123,1) 100%);
    background: -webkit-linear-gradient(-45deg, rgba(235,111,165,1) 0%,rgba(255,153,153,1) 50%,rgba(232,46,123,1) 100%);
    background: linear-gradient(135deg, rgba(235,111,165,1) 0%,rgba(255,153,153,1) 50%,rgba(232,46,123,1) 100%);
  }
  .layout-tab-toolbar {
    min-height: 32px;
    height: 32px;
  }
  .layout-tab-toolbar .md-icon-button {
    width: 24px;
    min-width:24px;
    height: 24px;
  }
  .layout-tab-toolbar .md-icon-font {
    color: rgba(255, 255, 255, .5);
    width: 24px;
    min-width: 24px !important;
    height: 24px;
  }
  .layout-tab-toolbar .md-icon {
    font-size: 16px !important;
  }
  .layout-tab-toolbar .md-button .md-ripple {
    border-radius: 0;
    padding: 0 !important;
  }
</style>
