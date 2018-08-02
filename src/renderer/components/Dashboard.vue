<template>
  <page>
    <top-panel/>
    [Dashboard]
  </page>
</template>

<script>
import TopPanel from '@components/TopPanel'
import Page from '@components/Page'
export default {
  name: 'Dashboard',
  components: {
    'top-panel': TopPanel,
    'page': Page
  }
}
</script>
