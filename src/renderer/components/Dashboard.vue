<template>
  <div>
    [Dashboard]
    <md-button
      class="md-primary md-raised"
      @click="$router.push({ name: 'login' })">
      Login
    </md-button>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>
