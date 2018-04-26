<template>
  <layout-one>
    <div>
      data location: {{ appData }}
    </div>
  </layout-one>
</template>

<script>
import { appData } from '@helpers/constants'
console.log(appData)
// const webContent = remote.getCurrentWebContents()// console.log(webContent)
export default {
  components: {
    'layout-one': () => import('@partials/layout-one')
  },
  data () {
    return {
      appData
    }
  }
}
</script>
