<template>
  <page class="test">
    <top-panel/>
    <router-view
      class="sub-route-panel"
      name="sub-top-panel"/>
    <div class="test2">
      <transition
        name="slide-fade-left">
        <router-view
          class="sub-page-route"
          name="sub-page"/>
      </transition>
    </div>
  </page>
</template>

<script>
import TopPanel from '@components/TopPanel'
import Page from '@components/Page'
export default {
  name: 'Dashboard',
  components: {
    'top-panel': TopPanel,
    'page': Page
  }
}
</script>

<style lang="scss" scoped>
  .test {
    display: flex;
    flex-direction: column;
  }
  .test2 {
    flex: 1;
    position: relative;
  }
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
