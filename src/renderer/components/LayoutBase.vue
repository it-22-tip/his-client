<template>
  <div
    :class="layout"
    class="layout-base">
    <transition name="slide-fade-left">
      <router-view
        class="full-page"/>
      <router-view
        class="content"
        name="content"/>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LayoutBase',
  computed: {
    ...mapGetters([
      'layout'
    ])
  }
}
</script>

<style lang="scss">
  .slide-fade-left-enter-active {
    transition: all 1s ease-in-out;
  }
  .slide-fade-left-leave-active {
    transition: all 1s ease-in-out;
  }
  .slide-fade-left-enter {
    transform: translateX(-100%);
  }
  .slide-fade-left-leave-to {
    transform: translateX(100%);
  }
</style>
