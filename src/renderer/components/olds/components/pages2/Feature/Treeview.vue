<template>
  <app-wrapper>
    <page-container>
      <template slot='header'>
      <h3 class='md-title' style='flex: 1'>SOP</h3>
       <menu-feature></menu-feature>
      </template>
      <div slot='default' class='padding-20'>
        <div class='abc'>
          <md-toolbar md-elevation='0'>Kategori</md-toolbar>
          <md-toolbar md-elevation='0'>
            <md-field>
              <label>Cari Kategori</label>
              <md-input v-model='searchText'></md-input>
            </md-field>
            <md-button class="md-raised" md-elevation="0" @click='inputKeyUp'>Cari</md-button>
          </md-toolbar>
          <div class='xyz'>
          <tree-view :data="asyncData" @item-click="itemClick" ref="tree"></tree-view>
          </div>
          <md-toolbar md-elevation='0'>Title</md-toolbar>
        </div>
        <div>
          <h1 style='font-size: 14px;'>{{ active }}</h1>
        </div>
      </div>
      <page-footer slot='footer'>
        <div>FOOTER</div>
      </page-footer>
    </page-container>
  </app-wrapper>
</template>

<script>
  import { simpleConvertTreeToList, treeify } from '@/helper/arraytotree'
  import mysql from 'mysql2'

  export default {
    data () {
      return {
        searchText: '',
        editingItem: {},
        editingNode: null,
        asyncData: [],
        active: ''
      }
    },
    methods: {
      loadData (oriNode, resolve) {
        let prt
        // console.log(this.$refs.tree)
       // var id = oriNode.data.id ? oriNode.data.id : 0
        if (oriNode.model !== undefined ) {
          prt = oriNode.model.value
        }
        return this.getData(resolve, prt)

      },
      getData (resolve, prt) {
        /* let _ = require('lodash')
        let fs = require('fs')
        fs.readFile(__static + '/doctree.json', 'utf-8', (error, result) => {
          if (error) {
            throw error
          }

          result = JSON.parse(result)

          if(prt !== undefined) {
            result = this.getObj(result, 'value', prt).children
            console.log(_.values(result))
          }
          resolve(result)
        }) */
      },
      itemClick: function (node) {
        this.editingNode = node
        this.editingItem = node.model
      },
      inputKeyUp () {
        var text = this.searchText
        const patt = new RegExp(text)
        this.$refs.tree.handleRecursionNodeChilds(this.$refs.tree, (node) => {
          if (text !== '') {
            const str = node.model.text
            if (patt.test(str)) {
              node.$el.querySelector('.tree-anchor').style.color = 'red'
            } else {
              node.$el.querySelector('.tree-anchor').style.color = '#000'
            } // or other operations
          } else {
            node.$el.querySelector('.tree-anchor').style.color = '#000'
          }
        })
      },
      addChildNode () {
        if (this.editingItem.id !== undefined) {
          this.editingItem.addChild({
            text: 'newNode',
            value: 'newNode'
          })
        }
      },
      removeNode () {
        if (this.editingItem.id !== undefined) {
          var index = this.editingNode.parentItem.indexOf(this.editingItem)
          this.editingNode.parentItem.splice(index, 1)
        }
      },
      refreshNode () {
        this.asyncData = [
          this.$refs.tree.initializeLoading()
        ]
        this.$refs.tree.handleAsyncLoad(this.asyncData, this.$refs.tree)
      },
      getObj (array, key, value) {
        let o
        array.some(
          function iter(arr) {
            // console.log(arr)
            if(arr[key] === value) {
              o = arr
              return true
            }
            let retval = Array.isArray(arr.children) && arr.children.some(iter)
            // console.log(retval)
            return retval
          }
        )
        return o
      }
    },
    mounted () {
      let fs = require('fs')
      try {
        fs.readFile(__static + '/doctree.json', 'utf-8', (error, result) => {
          if (error) {
            throw error
          }
          // result = JSON.parse(result)
          // console.log(result)
          // result = simpleConvertTreeToList(result)
          // console.log(result)
          // console.log(JSON.stringify(result))

          this.asyncData = []
          // console.log(result)
          // console.log(treeFlatten(result))
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
</script>


<style lang='scss' scoped>
  .padding-20 {
    padding: 0;
    height: 100%;
    display: flex;
  }
  .abc {
    height: 100%;
    width: 800px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .xyz {
    flex: 1;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>
