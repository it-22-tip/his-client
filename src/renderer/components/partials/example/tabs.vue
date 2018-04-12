<template>
  <layout-one>
    tabs
  </layout-one>
</template>
<script>
export default {
  components: {
    'layout-one': () => import('@partials/layout-tab')
  }
}
</script>

