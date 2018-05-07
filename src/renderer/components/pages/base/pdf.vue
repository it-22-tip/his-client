<template>
  <div class="pdf-viewer">
    <md-toolbar
      md-elevation="0"
      class="pdf-viewer-toolbar">
      <md-button @click="clickInsert">Insert</md-button>
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
        :page="page"
        style="height: 100%; width: 100%;"
        @loaded="onLoaded"
        @page-loaded="currentPage = $event"
        @num-pages="pageCount = $event"
        @progress="progress = $event"
      />
    </md-content>
  </div>
</template>

<script>
// import pdf from '@extras/pdf'
export default {
  components: {
    'extra-pdf': () => import('@extras/pdf')
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
    base64ArrayBuffer (arrayBuffer) {
      var base64 = ''
      var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

      var bytes = new Uint8Array(arrayBuffer)
      var byteLength = bytes.byteLength
      var byteRemainder = byteLength % 3
      var mainLength = byteLength - byteRemainder

      var a, b, c, d
      var chunk

      // Main loop deals with bytes in chunks of 3
      for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
        d = chunk & 63 // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
      }

      // Deal with the remaining bytes and padding
      if (byteRemainder === 1) {
        chunk = bytes[mainLength]

        a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        b = (chunk & 3) << 4 // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + '=='
      } else if (byteRemainder === 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

        a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2 // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + '='
      }

      return base64
    },
    onLoaded: () => { console.log('loaded') },
    onPageLoaded: () => { console.log('page loaded') },
    async connect () {
      /* let string
      let instance
      try {
        string = await import(__static + '/config/db.json').then(val => { return val })
      } catch (error) {
        console.log({'no config error': error})
      }
      try {
        instance = await mysql.createConnection(string)
        return instance
      } catch (error) {
        console.log({'config error': error})
      } */
    },
    clickGet () {
      this.run('SELECT * FROM pdf WHERE id = ? LIMIT 1;', [1]).then(
        val => {
          let u8 = val[0][0].data
          let base64 = this.base64ArrayBuffer(u8)
          base64 = atob(base64)
          this.src = { data: base64 }
        }
      )
    },
    clickInsert () {
      /* let fs = require('fs')
      fs.readFile(__static + '/Overflow.pdf', (error, result) => {
        if (error) console.log('read Error')
        this.run('INSERT INTO pdf SET ?;', { id: 1, mime: 'application/pdf', data: result }).then(
          val => {
            console.log(val)
          }
        )
      }) */
    }
  }
}
</script>

<style lang="scss" scoped>
  .pdf-viewer {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  .pdf-viewer-content {
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
</style>
