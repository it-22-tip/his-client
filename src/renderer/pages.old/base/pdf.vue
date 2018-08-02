<template>
  <layout>
    <pdf-viewer/>
  </layout>
</template>

<script>
export default {
  name: 'BasePdf',
  components: {
    'layout': () => import('@components/layout-one'),
    'pdf-viewer': () => import('@components/pdf-viewer')
  }
}
</script>
