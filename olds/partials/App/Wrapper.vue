<template>
  <div class="app-wrapper">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'AppWrapper'
}
</script>

<style lang="scss" scoped>
  .app-wrapper {
    height: 100vh;
    width: 100vw;
    display: block;
    position: relative;
  }
</style>
