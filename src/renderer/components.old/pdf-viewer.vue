<template>
  <div class="pdf-viewer">
    <div>
      <md-toolbar
        md-elevation="0"
        class="pdf-viewer-toolbar">
        <md-button @click="$router.go(-1)">Back</md-button>
        <md-button @click="clickGet">Get</md-button>
        <md-button @click="clickPrint">Print</md-button>
      </md-toolbar>
      <input
        v-model.number="page"
        type="number" >
      <div>{{ currentPage }} / {{ pageCount }}</div>
      <md-content class="pdf-viewer-content md-scrollbar">
        <extra-pdf
          ref="pdf"
          :src="src"
          :page="parseInt(page)"
          style="height: 100%; width: 100%;"
          @loaded="onLoaded"
          @page-loaded="currentPage = $event"
          @num-pages="pageCount = $event"
          @progress="progress = $event"
        />
      </md-content>
    </div>
  </div>
</template>

<script>
import { readFile } from '@helpers/files'
import { appDataPath } from '@helpers/constants'
import base64ArrayBuffer from '@helpers/base64ArrayBuffer'
import path from 'path'
export default {
  components: {
    'extra-pdf': () => import('@components/extras/pdf')
  },
  data () {
    return {
      src: null,
      numPages: null,
      pageCount: 0,
      currentPage: 0,
      loadingTask: null,
      progress: 0,
      page: 1
    }
  },
  mounted () {
  },
  methods: {
    clickPrint () {
      this.$refs.pdf.print(1, [1, 2])
    },
    onLoaded: () => { console.log('loaded') },
    onPageLoaded: () => { console.log('page loaded') },
    clickGet () {
      /* this.run('SELECT * FROM pdf WHERE id = ? LIMIT 1;', [1]).then(
        val => {
          let u8 = val[0][0].data
          let base64 = this.base64ArrayBuffer(u8)
          base64 = atob(base64)
          this.src = { data: base64 }
        }
      ) */
      this.psg()
    },
    async psg () {
      const file = path.join(appDataPath, 'test.pdf')
      let pdfFile
      try {
        pdfFile = await readFile(file)
        // console.log(pdfFile)
        pdfFile = base64ArrayBuffer(pdfFile)
        pdfFile = atob(pdfFile)
        this.src = { data: pdfFile }
      } catch (error) {
        console.log(error)
      }

      /* let u8 = val[0][0].data
      let base64 = this.base64ArrayBuffer(u8)
      base64 = atob(base64)
      this.src = { data: base64 } */
    }
  }
}
</script>

<style lang="scss" scoped>
  .pdf-viewer {
    flex: 1;
    height: 100%;
    width: 100%;
  }
  .pdf-viewer > div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .pdf-viewer-content {
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
</style>
