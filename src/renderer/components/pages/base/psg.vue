<template>
  <div>
    test
  </div>
</template>
<script>
// import psgCmp from './psg-cmp'
export default {
  name: 'Psg',
  component: {
    'psg-cmp': () => import('./psg-cmp')
  }
}
</script>
