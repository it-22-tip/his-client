<template>
  <layout-base id="app"/>
</template>

<script>
export default {
  name: 'App',
  components: {
    'layout-base': () => import('@components/LayoutBase')
  }
}
</script>
