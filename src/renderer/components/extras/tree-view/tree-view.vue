<template>
  <div class="tree-outer">
    <div class="tree-inner">
      <div
        :class="classes"
        role="tree"
        onselectstart="return false">
        <ul
          :class="containerClasses"
          role="group">
          <tree-view-item
            v-for="(child, index) in itemData"
            :key="index"
            :item-data="child"
            :text-field-name="textFieldName"
            :value-field-name="valueFieldName"
            :children-field-name="childrenFieldName"
            :item-events="itemEvents"
            :whole-row="wholeRow"
            :show-checkbox="showCheckbox"
            :height="sizeHight"
            :parent-item="itemData"
            :draggable="draggable"
            :on-item-click="onItemClick"
            :on-item-toggle="onItemToggle"
            :on-item-drag-start="onItemDragStart"
            :on-item-drag-end="onItemDragEnd"
            :on-item-drop="onItemDrop"
            :item-class="index === itemData.length-1 ? 'tree-last' : ''"/>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
let ITEM_ID = 0
let ITEM_HEIGHT_SMALL = 18
let ITEM_HEIGHT_DEFAULT = 24
let ITEM_HEIGHT_LARGE = 32

export default {
  name: 'TreeView',
  components: {
    'tree-view-item': () => import('./tree-view-item')
  },
  props: {
    itemData: {type: Array, default: () => {}},
    size: {type: String, default: '', validator: value => ['large', 'small'].indexOf(value) > -1},
    showCheckbox: {type: Boolean, default: false},
    wholeRow: {type: Boolean, default: false},
    noDots: {type: Boolean, default: false},
    collapse: {type: Boolean, default: false},
    multiple: {type: Boolean, default: false},
    allowBatch: {type: Boolean, default: false},
    textFieldName: {type: String, default: 'text'},
    valueFieldName: {type: String, default: 'value'},
    childrenFieldName: {type: String, default: 'children'},
    itemEvents: {type: Object, default: function () { return {} }},
    asyncFunction: {type: Function, default: () => {}},
    loadingText: {type: String, default: 'Loading...'},
    draggable: {type: Boolean, default: false},
    itemClass: {type: String, default: null}
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
  created () {
    this.initialize()
  },
  mounted () {
    if (this.asyncFunction) {
      this.$set(this.itemData, 0, this.initializeLoading())
      this.handleAsyncLoad(this.itemData, this)
    }
  },
  methods: {
    initializeData (items) {
      if (items && items.length > 0) {
        for (let i in items) {
          let dataItem = this.initializeDataItem(items[i])
          items[i] = dataItem
          this.initializeData(items[i][this.childrenFieldName])
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
        this[this.childrenFieldName] = item[this.childrenFieldName] || []
      }
      let node = Object.assign(new Model(item, this.textFieldName, this.valueFieldName, this.collapse), item)
      let self = this
      node.addBefore = function (data, selectedNode) {
        let newItem = self.initializeDataItem(data)
        let index = selectedNode.parentItem.indexOf(node)
        selectedNode.parentItem.splice(index, 0, newItem)
      }
      node.addAfter = function (data, selectedNode) {
        let newItem = self.initializeDataItem(data)
        let index = selectedNode.parentItem.indexOf(node) + 1
        selectedNode.parentItem.splice(index, 0, newItem)
      }
      node.addChild = function (data) {
        let newItem = self.initializeDataItem(data)
        node[this.childrenFieldName].push(newItem)
      }
      node.openChildren = function () {
        node.opened = true
        self.handleRecursionNodeChildren(node, node => {
          node.opened = true
        })
      }
      node.closeChildren = function () {
        node.opened = false
        self.handleRecursionNodeChildren(node, node => {
          node.opened = false
        })
      }
      return node
    },
    initializeLoading () {
      let item = {}
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
    handleRecursionNodeChildren (node, func) {
      if (node[this.childrenFieldName] && node[this.childrenFieldName].length > 0) {
        for (let childNode of node[this.childrenFieldName]) {
          func(childNode)
          this.handleRecursionNodeChildren(childNode, func)
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
        this.handleAsyncLoad(oriNode.model[this.childrenFieldName], oriNode, oriItem)
      }
      this.$emit('item-toggle', oriNode, oriItem)
    },
    handleAsyncLoad (oriParent, oriNode, oriItem) {
      let self = this
      if (this.asyncFunction) {
        if (oriParent[0].loading) {
          this.asyncFunction(oriNode, (data) => {
            if (data.length > 0) {
              for (let i in data) {
                data[i][this.childrenFieldName] = [self.initializeLoading()]
                let dataItem = self.initializeDataItem(data[i])
                self.$set(oriParent, i, dataItem)
              }
            } else {
              oriNode.model[this.childrenFieldName] = []
            }
          })
        }
      }
    },
    onItemDragStart (e, oriNode, oriItem) {
      if (!this.draggable) return false
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
      if (!this.draggable) return false
      this.draggedItem = null
    },
    onItemDrop (e, oriNode, oriItem) {
      if (!this.draggable) return false
      if (this.draggedElm === e.target || this.draggedElm.contains(e.target)) {
        return
      }
      if (this.draggedItem) {
        if (
          this.draggedItem.parentItem === oriItem[this.childrenFieldName] ||
          this.draggedItem.item === oriItem ||
          (oriItem[this.childrenFieldName] && oriItem[this.childrenFieldName].indexOf(this.draggedItem.item) !== -1)
        ) return

        oriItem[this.childrenFieldName] = oriItem[this.childrenFieldName] ? oriItem[this.childrenFieldName].concat(this.draggedItem.item) : [this.draggedItem.item]
        let draggedItem = this.draggedItem
        this.$nextTick(() => {
          draggedItem.parentItem.splice(draggedItem.index, 1)
        })
      }
    },
    initialize () {
      this.initializeData(this.itemData)
    }
  }
}
</script>

<style lang="scss">
.tree-outer {
  flex: 1;
  overflow: hidden;
  display: flex;
  min-height: 0;
  position: relative;
}
.tree-inner {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  height: 100%;
  display: block;
  width: 100%;
  overflow: auto;
}
.tree-inner::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

/* Track */
.tree-inner::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
.tree-inner::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
.tree-inner::-webkit-scrollbar-thumb:hover {
    background: #555;
}
.tree-node,
.tree-children,
.tree-container-ul {
  display: block;
  margin: 0;
  padding: 0;
  list-style-type: none;
  list-style-image: none;
}
</style>
