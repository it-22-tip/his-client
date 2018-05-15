<template>
  <layout>
    <div>
      <p>{{ appData }}</p>
      <p>{{ documents }}</p>
      <p>{{ lo }}</p>
    </div>
  </layout>
</template>

<script>
import { remote } from 'electron'
const { getPath } = remote.app
export default {
  name: 'DataProcess',
  components: {
    'layout': () => import('@partials/layout-one')
  },
  props: {
    num: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      appData: getPath('userData'),
      documents: getPath('documents'),
      lo: getPath('desktop')
    }
  },
  mounted () {
    console.log(this.num)
  }
}
</script>
