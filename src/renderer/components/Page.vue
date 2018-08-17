<template>
  <div class="page">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Page'
}
</script>

<style lang="scss" scoped>
  .page {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
</style>
