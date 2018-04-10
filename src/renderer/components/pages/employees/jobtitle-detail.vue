<template>
  <layout-one>
    <p>{{ jobtitleId }}</p>
  </layout-one>
</template>

<script>
  export default {
    name: 'JobTitleDetail',
    props: [
      'jobtitleId'
    ],
    components: {
      'layout-one': () => import('@partials/layout-one')
    }
  }
</script>

