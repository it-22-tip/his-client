<script>
'use-strict'
import Vue from 'vue'
const options = Vue.component('MdFile')
export default {
  name: 'DirectoryInput',
  extends: options,
  render (createElement) {
    const options = {
      on: {
        'md-change': (e) => {
          console.log(e)
        }
      }
    }
    const input = createElement('md-file', options)
    return input
  }
}
</script>

