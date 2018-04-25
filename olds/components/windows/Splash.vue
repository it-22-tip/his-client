<template>
  <div
    :style="getStyle()"
    class="splash-screen">
    <div class="main">
      <!-- <div class="logo"><img :src="logo" /></div> -->
      <!-- <info></info> -->
    </div>
    <md-progress-bar
      class="progress"
      md-mode="indeterminate"/>
  </div>
</template>

<script>
export default {
  name: 'SplashScreen',
  components: {
    'info': () => import('./SystemInfo')
  },
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
  .splash-screen {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .splash-screen .main {
    flex: 1;
  }
</style>
