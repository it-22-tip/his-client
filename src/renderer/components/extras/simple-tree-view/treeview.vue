<template>
  <ul id="demo">
    <tree-view-item
      :model="treeData"
      class="item"/>
  </ul>
</template>

<script>
import treeData from './sample.js'
export default {
  components: {
    'tree-view-item': () => import('./tree-view-item.vue')
  },
  data () {
    return {
      treeData: treeData
    }
  }
}
</script>

<style scoped>
.item {
  cursor: pointer;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
