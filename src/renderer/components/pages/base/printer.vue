<template>
  <div class="printer">
    <img :src="img">
  </div>
</template>

<script>
  export default {
    name: 'Intro',
    data () {
      return {
        img: `static/svg/logo.svg`
      }
    },
    created () {

    }
  }
</script>

<style lang="scss" scoped>
  .printer {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: rgba(black, .3);
  }
  .printer .main {
    flex: 1;
  }
</style>

