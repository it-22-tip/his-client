<style src="./annotationLayer.css"></style>
<script>
import componentFactory from './componentFactory.js'
let component

if (process.env.VUE_ENV === 'server') {
  component = componentFactory({})
} else {
  var pdfjsWrapper = require('./pdfjsWrapper.js').default
  var PDFJS = require('pdfjs-dist/webpack.js')
  component = componentFactory(pdfjsWrapper(PDFJS))
}

export default component
</script>
