<template>
  <div class="scroll-wrapper" v-bar>
    <div>
      <slot/>
    </div>
  </div>
</template>

<script>
  import Vuebar from 'vuebar'
  import Vue from 'vue'
  Vue.use(Vuebar)
  export default {
    name: 'scroll-wrapper'
  }
</script>

<style lang="scss" scoped>
  .scroll-wrapper {
    height: 100%;
    width: 100%;
  }
</style>
