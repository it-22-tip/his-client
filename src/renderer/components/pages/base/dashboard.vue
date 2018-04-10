<template>
  <layout-one>
    [Heloo]
  </layout-one>
</template>

<script>
  import file from '@/mixins/file'
  import orm from '@/mixins/orm'
  import { mapValues } from 'lodash'
  export default {
    mixins: [
      file, orm
    ],
    components: {
      'base-button': () => import('@partials/base-button'),
      'layout-one': () => import('@partials/layout-one')
    },
    methods: {
      logOut () {
        this.$router.push({ name: 'base.login' })
      }
    }
  }
</script>
