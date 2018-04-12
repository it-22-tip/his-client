<template>
  <div class="tree-container">
    <div :class="classes" onselectstart="return false">
      <ul :class="containerClasses">
        <tree-view-item
          v-for="(child, index) in itemData"
          :key="index"
          :item-data="child"
          :whole-row="wholeRow"
          :show-checkbox="showCheckbox"
          :height="sizeHeight"
          :parent-item="itemData"
          :draggable="draggable"
          :on-item-click="onItemClick"
          :on-item-toggle="onItemToggle"
          :on-item-drag-start="onItemDragStart"
          :on-item-drag-end="onItemDragEnd"
          :on-item-drop="onItemDrop"
          :item-class="index === itemData.length-1 ? 'tree-last' : ''">
        </tree-view-item>
      </ul>
    </div>
  </div>
</template>
<script>
  let ITEM_ID = 0
  let ITEM_HEIGHT_SMALL = 18
  let ITEM_HEIGHT_DEFAULT = 24
  let ITEM_HEIGHT_LARGE = 32

  export default {
    name: 'tree-view',
    components: {
      'tree-view-item': () => import('./tree-view-item')
    },
    props: {
      itemData: {
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
      async: {
        type: Function
      },
      loadingText: {
        type: String,
        default: 'Loading...'
      },
      draggable: {
        type: Boolean, default: false
      },
      itemClass: String
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
          {[this.itemClass]: !!this.itemClass}
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
      sizeHeight () {
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
        function Model (item, textFieldName, valueFieldName) {
          this.id = item.id || ITEM_ID++
          this[textFieldName] = item[textFieldName] || ''
          this[valueFieldName] = item[valueFieldName] || item[textFieldName]
          this.icon = item.icon || ''
          this.opened = item.opened || false
          this.selected = item.selected || false
          this.disabled = item.disabled || false
          this.loading = item.loading || false
          this.children = item.children || []
        }
        let node = new Model(item, this.textFieldName, this.valueFieldName)
        let self = this
        node.addChild = function (data) {
          let newItem = self.initializeDataItem(data)
          console.log(newItem)
          node.children.push(newItem)
        }
        console.log(node)
        return node
      },
      initializeLoading () {
        var item = {}
        item[this.textFieldName] = this.loadingText
        item.disabled = true
        item.loading = true
        return this.initializeDataItem(item)
      },
      handleRecursionNodeChilds (node, func) {
        if (node.$children && node.$children.length > 0) {
          for (let childNode of node.$children) {
            if (!childNode.disabled) {
              func(childNode)
              this.handleRecursionNodeChilds(childNode, func)
            }
          }
        }
      },
      onItemClick (oriNode, oriItem) {
        if (this.multiple) {
          if (this.allowBatch) {
            this.handleBatchSelectItems(oriNode, oriItem)
          }
        } else {
          this.handleSingleSelectItems(oriNode, oriItem)
        }
        console.log('click')
        this.$emit('item-click', oriNode, oriItem)
      },
      handleSingleSelectItems (oriNode, oriItem) {
        this.handleRecursionNodeChilds(this, node => {
          node.model.selected = false
        })
        oriNode.model.selected = true
      },
      handleBatchSelectItems (oriNode, oriItem) {
        this.handleRecursionNodeChilds(oriNode, node => {
          if (node.model.disabled) return
          node.model.selected = oriNode.model.selected
        })
      },
      onItemToggle (oriNode, oriItem) {
        if (oriNode.model.opened) {
          this.handleAsyncLoad(oriNode.model.children, oriNode, oriItem)
        }
        this.$emit('item-toggle', oriNode, oriItem)
      },
      handleAsyncLoad (oriParent, oriNode, oriItem) {
        var self = this
        if (this.async) {
          if (oriParent[0].loading) {
            this.async(oriNode, (data) => {
              if (data.length > 0) {
                for (let i in data) {
                  data[i].children = [self.initializeLoading()]
                  var dataItem = self.initializeDataItem(data[i])
                  self.$set(oriParent, i, dataItem)
                }
              } else {
                oriNode.model.children = []
              }
            })
          }
        }
      },
      onItemDragStart (e, oriNode, oriItem) {
        if (!this.draggable) {
          return false
        }
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text', null)
        this.draggedElm = e.target
        this.draggedItem = {
          item: oriItem,
          parentItem: oriNode.parentItem,
          index: oriNode.parentItem.indexOf(oriItem)
        }
      },
      onItemDragEnd (e, oriNode, oriItem) {
        if (!this.draggable) {
          return false
        }
        this.draggedItem = null
      },
      onItemDrop (e, oriNode, oriItem) {
        if (!this.draggable) {
          return false
        }
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
          var draggedItem = this.draggedItem
          this.$nextTick(() => {
            draggedItem.parentItem.splice(draggedItem.index, 1)
          })
        }
      }
    },
    created () {
      // console.log(this.itemData)
      this.initializeData(this.itemData)
    },
    mounted () {
      if (this.async) {
        this.$set(this.itemData, 0, this.initializeLoading())
        this.handleAsyncLoad(this.itemData, this)
      }
    }
  }
</script>
<style lang="scss" scoped>
.tree-container {
  display: flex;
  overflow: hidden;
  flex: 1;
}
// tc
.tree-container::-webkit-scrollbar {
    width: 5px;
}

/* Track */
.tree-container::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
.tree-container::-webkit-scrollbar-thumb {
    background: #ffcc00;
}

/* Handle on hover */
.tree-container::-webkit-scrollbar-thumb:hover {
    background: #555;
}

// t
.tree::-webkit-scrollbar {
    height: 8px;
    width: 8px;
}

/* Track */
.tree::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
.tree::-webkit-scrollbar-thumb {
    background: #ff0000;
}

/* Handle on hover */
.tree::-webkit-scrollbar-thumb:hover {
    background: #555;
}


.tree {
  flex: 1;
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  min-height: 0;
}
.tree-container-ul.tree-children {
  display: block;
  margin: 0;
  padding: 0;
  list-style-type: none;
  list-style-image: none;
}
</style>

