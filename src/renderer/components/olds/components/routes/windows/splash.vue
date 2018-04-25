<template>
  <splash-window/>
</template>

<script>
export default {
  name: 'WindowSplash',
  components: {
    'splash-window': () => import('@windows/splash')
  }
}
</script>
