<style src="./annotationLayer.css"></style>
<script>
import componentFactory from './componentFactory'
import pdfjsWrapper from './pdfjsWrapper'
let PDFJS

if (process.env.VUE_ENV === 'server') {
  PDFJS = require('pdfjs-dist/build/pdf.js')
  PDFJS.PDFJS.disableWorker = true
} else {
  PDFJS = require('pdfjs-dist/webpack.js')
}

var component = componentFactory(pdfjsWrapper(PDFJS))
component.PDFJS = PDFJS

export default component
</script>
