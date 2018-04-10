<template>
  <div id="app">
    <router-view></router-view>
    <p class="idle">{{ idle }}</p>
  </div>
</template>

<style lang="scss" scoped>
  .idle {
    position: absolute;
    z-index: 10000;
    margin: 0;
    padding: 0;
  }
</style>

<script>
  export default {
    name: 'App',
    data () {
      return {
        timer: 0,
        idle: 0
      }
    },
    created () {
      document.addEventListener('keyup', this.globalKeyup)
      document.addEventListener('mouseup', this.globalMouseup)
      document.addEventListener('mousemove', this.globalMousemove)
      this.refresh()
    },
    beforeDestroy () {
      document.removeEventListener('keyup', this.globalKeyup)
      document.removeEventListener('mouseup', this.globalMouseup)
      document.removeEventListener('mousemove', this.globalMousemove)
    },
    methods: {
      refresh () {
        setInterval(this.timerIncrement, 60000)
      },
      timerIncrement () {
        this.idle = this.idle + 1
      },
      globalMouseup ($event) {
        this.idle = 0
      },
      globalKeyup ($event) {
        this.idle = 0
      },
      globalMousemove ($event) {
        this.idle = 0
      }
    }
  }
</script>
