<template>
  <div class="window-splash" :style="getStyle()">
    <div class="main">
    </div>
  <md-progress-bar class="progress" md-mode="indeterminate"></md-progress-bar>
  </div>
</template>

<script>
  export default {
    name: 'splash-screen',
    data () {
      return {
        logo: 'static/svg/logo.svg'
      }
    },
    methods: {
      getStyle () {
        return {
          backgroundImage: `url('static/svg/splash.svg')`,
          backgroundSize: 'cover'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .window-splash {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .window-splash .main {
    flex: 1;
  }
</style>

