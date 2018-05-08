<template>
  <layout>
    <pdf-viewer/>
  </layout>
</template>

<script>
export default {
  name: 'BasePdf',
  components: {
    'layout': () => import('@partials/layout-one'),
    'pdf-viewer': () => import('@partials/pdf-viewer')
  }
}
</script>
