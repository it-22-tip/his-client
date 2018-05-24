<template>
  <md-content class="wrapper">
    <md-content class="right">
      <md-content class="right-top">
        <mtoolbar/>
      </md-content>
      <md-content class="right-bottom">
        <md-content class="padding-10">
          <slot/>
        </md-content>
      </md-content>
    </md-content>
  </md-content>
</template>

<script>
export default {
  components: {
    'mtoolbar': () => import('@partials/app-toolbar')
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
</style>
