<template>
  <div
    v-bar
    class="scroll-wrapper">
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
  name: 'ScrollWrapper'
}
</script>

<style lang="scss" scoped>
  .scroll-wrapper {
    height: 100%;
    width: 100%;
  }
</style>
