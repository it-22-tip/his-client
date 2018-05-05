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
      <md-button
        class="md-raised"
        @click="open">Open</md-button>
      <p>{{ sel }}</p>
    </div>
  </layout-one>
</template>

<script>
import { readDir } from '@helpers/files'
import { remote } from 'electron'
import { appData, homePath } from '@helpers/constants'
import windowDefinitions from '@windowDefinitions'
import windowUrls from '@windowUrls'
const { BrowserWindow, getCurrentWindow } = remote
const { directoryDefinition } = windowDefinitions
const { directoryUrl } = windowUrls

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
  computed: {
    sel () {
      // return 0
      return this.$store.state.Directory.selection
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
      try {
        const cw = getCurrentWindow()
        directoryDefinition.parent = cw
        const mw = new BrowserWindow(directoryDefinition)
        mw.loadURL(directoryUrl)
        mw.webContents.on('did-finish-load', () => {
          mw.show()
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
