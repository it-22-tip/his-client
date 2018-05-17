<template>
  <div
    :class="{ minimize }"
    class="dev-button">
    <md-button
      class="md-icon-button"
      @click="devToolsButton">
      <md-icon>build</md-icon>
      <md-tooltip md-direction="bottom">Dev Tools</md-tooltip>
    </md-button>
    <md-button
      class="md-icon-button"
      @click="reloadButton">
      <md-icon>loop</md-icon>
      <md-tooltip md-direction="bottom">Reload</md-tooltip>
    </md-button>
    <md-button
      class="md-icon-button"
      @click="clearConsoleButton">
      <md-icon>delete</md-icon>
      <md-tooltip md-direction="bottom">Clear Console</md-tooltip>
    </md-button>
    <md-button
      class="md-icon-button"
      @click="backButton">
      <md-icon>navigate_before</md-icon>
      <md-tooltip md-direction="bottom">Backward</md-tooltip>
    </md-button>
    <md-button
      class="md-icon-button"
      @click="forwardButton">
      <md-icon>navigate_next</md-icon>
      <md-tooltip md-direction="bottom">Forward</md-tooltip>
    </md-button>
    <md-button
      class="md-icon-button"
      @click="closeButton">
      <md-icon>close</md-icon>
      <md-tooltip md-direction="bottom">Close App</md-tooltip>
    </md-button>
    <md-button
      class="md-icon-button minimize-button"
      @click="minimizeButton">
      <md-icon>{{ icon }}</md-icon>
      <md-tooltip md-direction="bottom">{{ iconText }}</md-tooltip>
    </md-button>
  </div>
</template>

<script>
import { remote } from 'electron'
const { getCurrentWindow, app } = remote
export default {
  data () {
    return {
      minimize: false
    }
  },
  computed: {
    icon () {
      return this.minimize ? 'add' : 'remove'
    },
    iconText () {
      return this.minimize ? 'show' : 'hide'
    }
  },
  methods: {
    devToolsButton () {
      getCurrentWindow().webContents.toggleDevTools()
    },
    reloadButton () {
      getCurrentWindow().reload()
    },
    clearConsoleButton () {
      console.clear()
    },
    closeButton () {
      app.exit()
    },
    backButton () {
      this.$router.go(-1)
    },
    forwardButton () {
      this.$router.go(1)
    },
    showIntro () {

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
  bottom: 0;
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
  width: 20px;
  min-width: 20px !important;
  height: 20px;
}
.dev-button .md-icon {
  font-size: 16px !important;
}
.dev-button .md-button .md-ripple {
  border-radius: 0;
  padding: 0 !important;
}
</style>
