<template>
  <div :style="{overflow: 'scroll'}">
    <codemirror
      v-model="code"
      :options="options"/>
  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/theme/monokai.css'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/fold/foldgutter.css'

import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'

// foldGutter
/* import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/xml-fold.js' */

export default {
  name: 'Cm',
  components: {
    codemirror
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      options: {
        tabSize: 4,
        // line: true,
        // lineNumbers: true,
        // lineNumbers: true,
        // line: true,
        lineWrapping: true,
        theme: 'monokai',
        mode: 'application/json'
      }
    }
  },
  computed: {
    code: {
      get () {
        return this.value
      },
      set () {

      }
    }
  }
}
</script>
