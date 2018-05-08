<template>
  <div>
    <md-field style="visibility: hidden; display: none;">
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
      @item-click="onClick"/>
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
      dummy: [],
      editingNode: null,
      editingItem: null
    }
  },
  computed: {
    ArrayDataView: {
      set (val) {
        this.arrayData = JSON.parse(val)
      },
      get () {
        const arrayData = JSON.stringify(this.arrayData, null, 2)
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
        console.log('change')
        let nd = value.slice(0)

        let trees = this.$refs.tree
        await this.$nextTick()
        this.dummy = nd
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
    onClick (node) {
      this.editingNode = node
      this.editingItem = node.model
      console.log()
      console.log(node.model.text + ' clicked !')
    },
    onClickSave () {
      this.saveData()
    }
  }
}
</script>

<style lang="scss" scoped>
.hello {
  height: 300px;
  width: 300px;
  background: #eeeeee;
}
</style>
