<template>
  <div :class="classes" role="tree" onselectstart="return false">
    <ul :class="containerClasses" role="group">
      <tree-view-item v-for="(child, index) in treeData"
        :key="index"
        :tree-data="child"
        :text-field-name="textFieldName"
        :value-field-name="valueFieldName"
        :item-events="itemEvents"
        :whole-row="wholeRow"
        :show-checkbox="showCheckbox"
        :height="sizeHight"
        :parent-item="treeData"
        :draggable="draggable"
        :on-item-click="onItemClick"
        :on-item-toggle="onItemToggle"
        :on-item-drag-start="onItemDragStart"
        :on-item-drag-end="onItemDragEnd"
        :on-item-drop="onItemDrop"
        :tree-class="index === treeData.length-1 ? 'tree-last' : ''">
      </tree-view-item>
    </ul>
  </div>
</template>
<script>
  import TreeViewItem from './tree-view-item.vue'

  let ITEM_ID = 0
  let ITEM_HEIGHT_SMALL = 18
  let ITEM_HEIGHT_DEFAULT = 24
  let ITEM_HEIGHT_LARGE = 32

  export default {
    name: 'TreeView',
    props: {
      treeData: {
        type: Array
      },
      size: {
        type: String,
        validator: value => ['large', 'small'].indexOf(value) > -1
      },
      showCheckbox: {
        type: Boolean,
        default: false
      },
      wholeRow: {
        type: Boolean,
        default: false
      },
      noDots: {
        type: Boolean,
        default: false
      },
      collapse: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      allowBatch: {
        type: Boolean,
        default: false
      },
      textFieldName: {
        type: String,
        default: 'text'
      },
      valueFieldName: {
        type: String,
        default: 'value'
      },
      itemEvents: {
        type: Object,
        default: function () {
          return {}
        }
      },
      async: {
        type: Function
      },
      loadingText: {
        type: String,
        default: 'Loading...'
      },
      draggable: {
        type: Boolean,
        default: false
      },
      treeClass: String
    },
    data () {
      return {
        draggedItem: null,
        draggedElm: null
      }
    },
    computed: {
      classes () {
        return [
          {'tree': true},
          {'tree-default': !this.size},
          {[`tree-default-${this.size}`]: !!this.size},
          {'tree-checkbox-selection': !!this.showCheckbox},
          {[this.treeClass]: !!this.treeClass}
        ]
      },
      containerClasses () {
        return [
          {'tree-container-ul': true},
          {'tree-children': true},
          {'tree-wholerow-ul': !!this.wholeRow},
          {'tree-no-dots': !!this.noDots}
        ]
      },
      sizeHight () {
        switch (this.size) {
          case 'large':
            return ITEM_HEIGHT_LARGE
          case 'small':
            return ITEM_HEIGHT_SMALL
          default:
            return ITEM_HEIGHT_DEFAULT
        }
      }
    },
    methods: {
      initializeData (items) {
        if (items && items.length > 0) {
          for (let i in items) {
            var dataItem = this.initializeDataItem(items[i])
            items[i] = dataItem
            this.initializeData(items[i].children)
          }
        }
      },
      initializeDataItem (item) {
        function Model (item, textFieldName, valueFieldName, collapse) {
          this.id = item.id || ITEM_ID++
          this[textFieldName] = item[textFieldName] || ''
          this[valueFieldName] = item[valueFieldName] || item[textFieldName]
          this.icon = item.icon || ''
          this.opened = item.opened || collapse
          this.selected = item.selected || false
          this.disabled = item.disabled || false
          this.loading = item.loading || false
          this.children = item.children || []
        }
        let treeNode = Object.assign(new Model(item, this.textFieldName, this.valueFieldName, this.collapse), item)
        let self = this
        treeNode.addBefore = function (data, selectedTreeNode) {
          let newItem = self.initializeDataItem(data)
          let index = selectedTreeNode.parentItem.indexOf(treeNode)
          selectedTreeNode.parentItem.splice(index, 0, newItem)
        }
        treeNode.addAfter = function (data, selectedTreeNode) {
          let newItem = self.initializeDataItem(data)
          let index = selectedTreeNode.parentItem.indexOf(treeNode) + 1
          selectedTreeNode.parentItem.splice(index, 0, newItem)
        }
        treeNode.addChild = function (data) {
          let newItem = self.initializeDataItem(data)
          treeNode.children.push(newItem)
        }
        treeNode.openChildren = function () {
          treeNode.opened = true
          self.handleRecursiontreeNodeChildren(treeNode, treeNode => {
            treeNode.opened = true
          })
        }
        treeNode.closeChildren = function () {
          treeNode.opened = false
          self.handleRecursiontreeNodeChildren(treeNode, treeNode => {
            treeNode.opened = false
          })
        }
        return treeNode
      },
      initializeLoading () {
        var item = {}
        item[this.textFieldName] = this.loadingText
        item.disabled = true
        item.loading = true
        return this.initializeDataItem(item)
      },
      handleRecursiontreeNodeChilds (treeNode, func) {
        if (treeNode.$children && treeNode.$children.length > 0) {
          for (let childtreeNode of treeNode.$children) {
            if (!childtreeNode.disabled) {
              func(childtreeNode)
              this.handleRecursiontreeNodeChilds(childtreeNode, func)
            }
          }
        }
      },
      handleRecursiontreeNodeChildren (treeNode, func) {
        if (treeNode.children && treeNode.children.length > 0) {
          for (let childtreeNode of treeNode.children) {
            func(childtreeNode)
            this.handleRecursiontreeNodeChildren(childtreeNode, func)
          }
        }
      },
      onItemClick (oriTreeNode, oriItem) {
        if (this.multiple) {
          if (this.allowBatch) {
            this.handleBatchSelectItems(oriTreeNode, oriItem)
          }
        } else {
          this.handleSingleSelectItems(oriTreeNode, oriItem)
        }
        this.$emit('item-click', oriTreeNode, oriItem)
      },
      handleSingleSelectItems (oriTreeNode, oriItem) {
        this.handleRecursiontreeNodeChilds(this, treeNode => {
          treeNode.model.selected = false
        })
        oriTreeNode.model.selected = true
      },
      handleBatchSelectItems (oriTreeNode, oriItem) {
        this.handleRecursiontreeNodeChilds(oriTreeNode, treeNode => {
          if (treeNode.model.disabled) return
          treeNode.model.selected = oriTreeNode.model.selected
        })
      },
      onItemToggle (oriTreeNode, oriItem) {
        if (oriTreeNode.model.opened) {
          this.handleAsyncLoad(oriTreeNode.model.children, oriTreeNode, oriItem)
        }
        this.$emit('item-toggle', oriTreeNode, oriItem)
      },
      handleAsyncLoad (oriParent, oriTreeNode, oriItem) {
        var self = this
        if (this.async) {
          if (oriParent[0].loading) {
            this.async(oriTreeNode, (data) => {
              if (data.length > 0) {
                for (let i in data) {
                  data[i].children = [self.initializeLoading()]
                  var dataItem = self.initializeDataItem(data[i])
                  self.$set(oriParent, i, dataItem)
                }
              } else {
                oriTreeNode.model.children = []
              }
            })
          }
        }
      },
      onItemDragStart (e, oriTreeNode, oriItem) {
        if (!this.draggable) return false
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text', null)
        this.draggedElm = e.target
        this.draggedItem = {
          item: oriItem,
          parentItem: oriTreeNode.parentItem,
          index: oriTreeNode.parentItem.indexOf(oriItem)
        }
      },
      onItemDragEnd (e, oriTreeNode, oriItem) {
        if (!this.draggable) return false
        this.draggedItem = null
      },
      onItemDrop (e, oriTreeNode, oriItem) {
        if (!this.draggable) return false
        if (this.draggedElm === e.target || this.draggedElm.contains(e.target)) {
          return
        }
        if (this.draggedItem) {
          if (this.draggedItem.parentItem === oriItem.children ||
            this.draggedItem.item === oriItem ||
            (oriItem.children && oriItem.children.indexOf(this.draggedItem.item) !== -1)) {
            return
          }
          oriItem.children = oriItem.children ? oriItem.children.concat(this.draggedItem.item) : [this.draggedItem.item]
          let draggedItem = this.draggedItem
          this.$nextTick(() => {
            draggedItem.parentItem.splice(draggedItem.index, 1)
          })
        }
      }
    },
    created () {
      this.initializeData(this.treeData)
    },
    mounted () {
      if (this.async) {
        this.$set(this.treeData, 0, this.initializeLoading())
        this.handleAsyncLoad(this.treeData, this)
      }
    },
    components: {
      TreeViewItem
    }
  }
</script>

<style lang="scss" scoped>
@import "./scss/all";
</style>
