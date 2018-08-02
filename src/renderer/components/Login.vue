<template>
  <div>
    [Login]
    <md-button
      class="md-primary md-raised"
      @click="$router.push({ name: 'dashboard' })">
      Dashboard
    </md-button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      layout: 'login'
    }
  }
}
</script>
