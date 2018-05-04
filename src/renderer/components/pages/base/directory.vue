<template>
  <layout-one>
    <div class="md-layout md-gutter">
      [directory]
    </div>
  </layout-one>
</template>

<script>
export default {
  name: 'Directory',
  components: {
    'layout-one': () => import('@partials/layout-one')
  },
  methods: {
  }
}
</script>
