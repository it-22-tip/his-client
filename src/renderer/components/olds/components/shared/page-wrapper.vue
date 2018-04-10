<template>
  <div class="page-wrapper" :style="pageStyle">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'wrapper',
    props: {
      pageStyle: {
        type: Object,
        default: () => {
          return {
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-wrapper {
    width: 100vw;
    height: 100vh;
    display: block;
    overflow: hidden;
    position: relative;
    margin: 0;
    padding: 0;
  }
</style>

