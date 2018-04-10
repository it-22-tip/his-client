<template>
  <div class="splash-screen" :style="getStyle()">
    <div class="main">
      <!-- <div class="logo"><img :src="logo" /></div> -->
      <!-- <info></info> -->
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
    components: {
      'info': () => import('./SystemInfo')
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

