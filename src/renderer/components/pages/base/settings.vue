<template>
  <layout-one>
    <div>
      data location: {{ appData }}
      <md-field>
        <label>Upload files</label>
        <md-file
          :value="value"
          :placeholder="placeholder"
          webkitdirectory
          @md-change="onChange"/>
      </md-field>
      <md-button @click="open">Open</md-button>
    </div>
  </layout-one>
</template>

<script>
import { readDir } from '@helpers/files'
// import { homePath } from '@helpers/constants'
import { remote } from 'electron'
import { appData, homePath } from '@helpers/constants'
const { dialog } = remote
console.log(appData)
console.log(remote)
// const webContent = remote.getCurrentWebContents()// console.log(webContent)

export default {
  components: {
    'layout-one': () => import('@partials/layout-one')
  },
  data () {
    return {
      appData: appData,
      placeholder: homePath,
      value: homePath
    }
  },
  watch: {
    value: {
      handler: function (val) {
        console.log(val)
        readDir(val).then(
          data => {
            console.log(data)
          }
        )
      }
    }
  },
  mounted () {
  },
  methods: {
    onChange ($event) {
      // console.log($event[0].path)
      this.value = $event[0].path
    },
    open () {
      // console.log('open')
      // console.log(dialog)
      // const window = remote.getCurrentWindow()
      dialog.showOpenDialog(
        remote,
        {
          properties: ['openDirectory']
        },
        path => {
          console.log(path)
        }
      )
      // dialog.showOpenDialog([browserWindow)
      // console.log(remote.getCurrentWindow())
      /* dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
      }) */
    }
  }
}
</script>
