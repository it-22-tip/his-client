<template>
  <page class="test">
    <md-content>
      <md-button
        class="md-primary md-raised"
        @click="$router.push({ name: 'dashboard' })">
        Dashboard
      </md-button>
    </md-content>
  </page>
</template>

<script>
import Page from '@components/Page'
export default {
  name: 'Login',
  components: {
    'page': Page
  },
  data () {
    return {
      layout: 'login'
    }
  }
}
</script>
