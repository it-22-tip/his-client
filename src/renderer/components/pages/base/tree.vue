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
      :data="treeData"
      value-field-name="id"
      class="hello"/>
  </div>
</template>

<script>
import path from 'path'
import { appDataPath } from '@helpers/constants'
import { readJSON } from '@helpers/files'
import { treeify } from '@helpers/arraytotree'
export default {
  components: {
    'tree-view': () => import('@extras/jstree')
  },
  data () {
    return {
      arrayData: null,
      treeData: []
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
      handler: async function (value) {
        // console.log(value)
        this.treeData = value
        await this.$nextTick()
        // console.log(this.$refs)
        let trees = this.$refs.tree
        let itemData = trees.itemData

        trees.initializeData(itemData)

        console.log(itemData)
        // trees.initialize()
      }
    }
  },
  mounted () {
    this.getData()
    console.log(this.$refs)
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
