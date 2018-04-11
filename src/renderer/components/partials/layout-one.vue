<template>
  <md-content class="wrapper">
    <md-content class="left">
      <md-content class="md-primary left-content">
        <left-menu/>
      </md-content>
    </md-content>
    <md-content class="right">
      <md-content class="right-top">
        <md-toolbar class="md-dense" md-elevation="0">
          [TOP]
        </md-toolbar>
      </md-content>
      <md-content class="right-bottom">
        <md-content class="padding-20">
          <slot/>
        </md-content>
      </md-content>
    </md-content>
  </md-content>
</template>
<style lang="scss" scoped>
  .wrapper {
    display: flex;
    flex-direction: row;
    position: relative;
    height: 100vh;
    width: 100vw;
  }
  .left {
    width: 250px;
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
    height: 60px;
    width: 100%;
    background-color: blue;
  }
  .right-bottom {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .padding-20 {
    padding: 20px;
    flex: 1;
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
</style>

<script>
  export default {
    components: {
      'left-menu': () => import('@partials/left-menu')
    }
  }
</script>

