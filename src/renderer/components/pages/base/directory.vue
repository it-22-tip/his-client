<template>
  <layout-one>
    [dir]
  </layout-one>
</template>

<script>
export default {
  components: {
    'base-button': () => import('@partials/base-button'),
    'layout-one': () => import('@partials/layout-one')
  },
  methods: {
  }
}
</script>
