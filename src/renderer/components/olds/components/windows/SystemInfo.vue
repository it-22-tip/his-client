<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <div class="name"><img
          :src="`static/svg/vuejs.svg`"
          height="100"
          width="100" ></div>
        <div class="value">{{ vue }}</div>
      </div>
      <div class="md-layout-item">
        <div class="name"><img
          :src="`static/svg/electron.svg`"
          height="100"
          width="100" ></div>
        <div class="value">{{ electron }}</div>
      </div>
      <div class="md-layout-item">
        <div class="name"><img
          :src="`static/svg/nodejs.svg`"
          height="100"
          width="100" ></div>
        <div class="value">{{ node }}</div>
      </div>
      <div class="md-layout-item">
        <div class="name"><img
          :src="`static/svg/ubuntu.svg`"
          height="100"
          width="100" ></div>
        <div class="value">{{ platform }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SystemInfo',
  data () {
    return {
      electron: process.versions['atom-shell'],
      name: this.$route.name,
      node: process.versions.node,
      path: this.$route.path,
      platform: require('os').platform(),
      vue: require('vue/package.json').version
    }
  }
}
</script>

<style scoped>

</style>
