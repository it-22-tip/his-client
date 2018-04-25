<template>
  <div
    :style="{
      'background-image': background,
      'background-size': 'cover'
    }"
    class="intro">
    <div class="main"/>
    <md-progress-bar md-mode="indeterminate"/>
  </div>
</template>

<script>
export default {
  name: 'Intro',
  data () {
    return {
      background: `url('static/svg/intro.svg')`
    }
  }
}
</script>

<style lang="scss" scoped>
  .intro {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .intro .main {
    flex: 1;
  }
</style>
