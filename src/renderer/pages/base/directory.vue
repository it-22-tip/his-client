<template>
  <layout-one>
    <md-button @click="select">select</md-button>
    {{ sel }}
  </layout-one>
</template>

<script>
import { ipcRenderer } from 'electron'
import { err, log } from '@/common/utils'

export default {
  components: {
    'base-button': () => import('@components/base-button'),
    'layout-one': () => import('@components/layout-two')
  },
  computed: {
    sel () {
      // return 0
      return this.$store.state.Directory.selection
    }
  },
  methods: {
    select () {
      // ipcRenderer.send('asynchronous-message', 'selected')
      // this.$store.commit('Directory/INCREASE_COUNT')
      try {
        this.$store.replaceState(ipcRenderer.sendSync('vuex-connect'))
        log('master state imported!')
      } catch (error) {
        err('import master state failed: %s', error)
      }
    }
  }
}
</script>
