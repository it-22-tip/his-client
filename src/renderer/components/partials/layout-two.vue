<template>
  <md-content class="wrapper">
    <md-content class="right">
      <md-content class="right-top">
        <md-toolbar
          class="md-dense md-primary electron-draggable"
          md-elevation="0">
          <div class="md-toolbar-section-start">
            <img :src="`static/png/32x32.png`">
            <h1 class="md-title">Select Directory</h1>
          </div>
          <div class="md-toolbar-section-end">
            <md-button
              class="md-icon-button electron-clickable"
              @click="close">
              <md-icon>close</md-icon>
              <md-tooltip md-direction="bottom">Close</md-tooltip>
            </md-button>
          </div>
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
  .electron-draggable {
    -webkit-app-region: drag;
  }
  .electron-clickable {
    -webkit-app-region: no-drag;
  }
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
    height: 60px;
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
  .padding-20 {
    padding: 20px;
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

<script>
import { remote } from 'electron'
const { getCurrentWindow } = remote
console.log(getCurrentWindow)
export default {
  components: {
    'left-menu': () => import('@partials/left-menu')
  },
  data () {
    return {
      link: [
        {
          to: { name: 'base.login' },
          icon: 'close',
          title: 'Out'
        }
      ]
    }
  },
  methods: {
    close () {
      const currentWindow = getCurrentWindow()
      currentWindow.close()
    }
  }
}
</script>
