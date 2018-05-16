<template>
  <div id="app">
    <router-view/>
    <dev-button/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    'dev-button': () => import('@partials/dev-button')
  }
}
</script>
