<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <div class="name"><img height="100" width="100" :src="`static/svg/vuejs.svg`" /></div>
        <div class="value">{{ vue }}</div>
      </div>
      <div class="md-layout-item">
        <div class="name"><img height="100" width="100" :src="`static/svg/electron.svg`" /></div>
        <div class="value">{{ electron }}</div>
      </div>
      <div class="md-layout-item">
        <div class="name"><img height="100" width="100" :src="`static/svg/nodejs.svg`" /></div>
        <div class="value">{{ node }}</div>
      </div>
      <div class="md-layout-item">
        <div class="name"><img height="100" width="100" :src="`static/svg/ubuntu.svg`" /></div>
        <div class="value">{{ platform }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'system-info',
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
