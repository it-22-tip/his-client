<template>
  <div>
    <button @click="$router.go(-1)">Back</button>
    <h1>Tree &amp; Array</h1>
    <md-field>
      <md-textarea
        v-model="ArrayDataView"
        class="md-scrollbar"
        resize="false"/>
    </md-field>
    <tree-view
      ref="tree"
      :item-data="dummy"
      value-field-name="id"
      class="hello"
      size="small"
      multiple
      allow-batch
      whole-row/>
  </div>
</template>

<script>
import path from 'path'
import { appDataPath } from '@helpers/constants'
import { readJSON } from '@helpers/files'
import { treeify } from '@helpers/arraytotree'
export default {
  components: {
    'tree-view': () => import('@extras/tree-view')
  },
  data () {
    return {
      arrayData: null,
      treeData: null,
      dummy: []
    }
  },
  computed: {
    ArrayDataView: {
      set (val) {
        this.arrayData = JSON.parse(val)
      },
      get () {
        const arrayData = JSON.stringify(this.arrayData)
        return arrayData
      }
    },
    TreeDataView () {
      let ad = JSON.parse(this.ArrayDataView)
      try {
        ad = treeify(ad)
      } catch (error) {

      }
      // console.log(ad)
      return ad
    }
  },
  watch: {
    TreeDataView: {
      handler: function (value) {
        console.log('change')
        let nd = value.slice(0)

        let trees = this.$refs.tree
        this.dummy = nd
        // trees.itemData = nd
        trees.initializeData(nd)
        // trees.handleAsyncLoad(nd, trees)
      }
    }
  },
  mounted () {
    this.getData()

    // console.log(this.$refs)
  },
  methods: {
    async getData () {
      let data = []
      try {
        data = await readJSON(path.join(appDataPath, 'example', 'docarray.json'))
      } catch (error) {

      }
      this.arrayData = data
    },
    async saveData () {

    },
    onClickSave () {
      this.saveData()
    }
  }
}
</script>

<style lang="scss" scoped>
.ok {
  height: 300px;
  width: 300px;
}
.hello {
  height: 300px;
  width: 300px;
}
</style>
