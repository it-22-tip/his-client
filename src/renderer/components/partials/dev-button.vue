<template>
  <div
    :class="{ minimize }"
    class="dev-button">
    <md-button
      class="md-icon-button"
      @click="devToolsButton">
      <md-icon>loop</md-icon>
    </md-button>
    <md-button
      class="md-icon-button"
      @click="reloadButton">
      <md-icon>loop</md-icon>
    </md-button>
    <md-button
      class="md-icon-button"
      @click="clearConsoleButton">
      <md-icon>loop</md-icon>
    </md-button>
    <md-button
      class="md-icon-button minimize-button"
      @click="minimizeButton">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
import { remote } from 'electron'
const { getCurrentWindow } = remote
const CurrentWindow = getCurrentWindow()
export default {
  data () {
    return {
      minimize: true
    }
  },
  methods: {
    devToolsButton () {
      CurrentWindow.webContents.toggleDevTools()
    },
    reloadButton () {
      CurrentWindow.reload()
    },
    clearConsoleButton () {
      console.clear()
    },
    backButton () {

    },
    forwardButton () {

    },
    minimizeButton () {
      this.minimize = !this.minimize
    }
  }
}
</script>

<style lang="scss" scoped>
.dev-button {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000000;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  flex-direction: row;
}
.dev-button .md-button {
  width: 20px;
  min-width: 20px;
  height: 20px;
}
.dev-button.minimize {
  width: 20px;
}
.dev-button.minimize .md-button {
  display: none;
}
.dev-button.minimize .md-button.minimize-button {
  display: block;
}
.dev-button .md-icon-font {
  color: rgba(255, 255, 255, .5);
}
</style>
