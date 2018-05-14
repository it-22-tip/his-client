<template>
  <layout>
    <div>
      [data]
    </div>
  </layout>
</template>

<script>
export default {
  name: 'DataProcess',
  components: {
    'layout': () => import('@partials/layout-one')
  }
}
</script>
