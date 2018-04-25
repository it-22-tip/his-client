<template>
  <div
    :style="pageStyle"
    class="page-wrapper">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
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
