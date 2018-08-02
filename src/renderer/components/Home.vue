<template>
  <div>
    [Home]
    <div @click="$router.push({ name: 'login' })">Login</div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
