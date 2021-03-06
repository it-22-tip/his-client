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
            :allow-transition="allowTransition"
            :height="sizeHeight"
            :parent-item="itemData"
            :draggable="draggable"
            :drag-over-background-color="dragOverBackgroundColor"
            :on-item-click="onItemClick"
            :on-item-toggle="onItemToggle"
            :on-item-drag-start="onItemDragStart"
            :on-item-drag-end="onItemDragEnd"
            :on-item-drop="onItemDrop"
            :item-class="index === itemData.length-1?'tree-last':''">
            <template slot-scope="_">
              <slot
                :vm="_.vm"
                :model="_.model">
                <i
                  v-if="!_.model.loading"
                  :class="_.vm.themeIconClasses"
                  role="presentation"/>
                <span v-html="_.model[textFieldName]"/>
              </slot>
            </template>
          </tree-view-item>
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
    'tree-view-item': () => import('./tree-view-item.vue')
  },
  props: {
    itemData: {type: Array, default: () => ([])},
    size: {type: String, default: 'large', validator: value => ['large', 'small'].indexOf(value) > -1},
    showCheckbox: {type: Boolean, default: false},
    wholeRow: {type: Boolean, default: false},
    noDots: {type: Boolean, default: false},
    collapse: {type: Boolean, default: false},
    multiple: {type: Boolean, default: false},
    allowBatch: {type: Boolean, default: false},
    allowTransition: {type: Boolean, default: true},
    textFieldName: {type: String, default: 'text'},
    valueFieldName: {type: String, default: 'value'},
    childrenFieldName: {type: String, default: 'children'},
    itemEvents: {type: Object, default: () => ({})},
    async: {type: Function, default: () => false},
    loadingText: {type: String, default: 'Loading ...'},
    draggable: {type: Boolean, default: false},
    dragOverBackgroundColor: {type: String, default: '#C9FDC9'},
    itemClass: {type: String, default: ''}
  },
  data () {
    return {
      draggedItem: undefined,
      draggedElm: undefined
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
  created () {
    this.initializeData(this.itemData)
  },
  mounted () {
    if (this.async) {
      this.$set(this.itemData, 0, this.initializeLoading())
      this.handleAsyncLoad(this.itemData, this)
    }
  },
  methods: {
    initializeData (items) {
      if (items && items.length > 0) {
        for (let i in items) {
          var dataItem = this.initializeDataItem(items[i])
          items[i] = dataItem
          this.initializeData(items[i][this.childrenFieldName])
        }
      }
    },
    initializeDataItem (item) {
      function Model (item, textFieldName, valueFieldName, childrenFieldName, collapse) {
        this.id = item.id || ITEM_ID++
        this[textFieldName] = item[textFieldName] || ''
        this[valueFieldName] = item[valueFieldName] || item[textFieldName]
        this.icon = item.icon || ''
        this.opened = item.opened || collapse
        this.selected = item.selected || false
        this.disabled = item.disabled || false
        this.loading = item.loading || false
        this[childrenFieldName] = item[childrenFieldName] || []
      }

      let node = Object.assign(new Model(item, this.textFieldName, this.valueFieldName, this.childrenFieldName, this.collapse), item)
      let self = this
      node.addBefore = function (data, selectedNode) {
        let newItem = self.initializeDataItem(data)
        let index = selectedNode.parentItem.findIndex(t => t.id === node.id)
        selectedNode.parentItem.splice(index, 0, newItem)
      }
      node.addAfter = function (data, selectedNode) {
        let newItem = self.initializeDataItem(data)
        let index = selectedNode.parentItem.findIndex(t => t.id === node.id) + 1
        selectedNode.parentItem.splice(index, 0, newItem)
      }
      node.addChild = function (data) {
        let newItem = self.initializeDataItem(data)
        node.opened = true
        node[self.childrenFieldName].push(newItem)
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
      var item = {}
      item[this.textFieldName] = this.loadingText
      item.disabled = true
      item.loading = true
      return this.initializeDataItem(item)
    },
    handleRecursionNodeChilds (node, func) {
      if (func(node) !== false) {
        if (node.$children && node.$children.length > 0) {
          for (let childNode of node.$children) {
            if (!childNode.disabled) {
              this.handleRecursionNodeChilds(childNode, func)
            }
          }
        }
      }
    },
    handleRecursionNodeChildren (node, func) {
      if (func(node) !== false) {
        if (node[this.childrenFieldName] && node[this.childrenFieldName].length > 0) {
          for (let childNode of node[this.childrenFieldName]) {
            this.handleRecursionNodeChildren(childNode, func)
          }
        }
      }
    },
    onItemClick (oriNode, oriItem, e) {
      if (this.multiple) {
        if (this.allowBatch) {
          this.handleBatchSelectItems(oriNode, oriItem)
        }
      } else {
        this.handleSingleSelectItems(oriNode, oriItem)
      }
      this.$emit('item-click', oriNode, oriItem, e)
    },
    handleSingleSelectItems (oriNode, oriItem) {
      this.handleRecursionNodeChilds(this, node => {
        if (node.model) node.model.selected = false
      })
      oriNode.model.selected = true
    },
    handleBatchSelectItems (oriNode, oriItem) {
      this.handleRecursionNodeChilds(oriNode, node => {
        if (node.model.disabled) return
        node.model.selected = oriNode.model.selected
      })
    },
    onItemToggle (oriNode, oriItem, e) {
      if (oriNode.model.opened) {
        this.handleAsyncLoad(oriNode.model[this.childrenFieldName], oriNode, oriItem)
      }
      this.$emit('item-toggle', oriNode, oriItem, e)
    },
    handleAsyncLoad (oriParent, oriNode, oriItem) {
      var self = this
      if (this.async) {
        if (oriParent[0].loading) {
          this.async(oriNode, (data) => {
            if (data.length > 0) {
              for (let i in data) {
                if (!data[i].isLeaf) {
                  if (typeof data[i][self.childrenFieldName] !== 'object') {
                    data[i][self.childrenFieldName] = [self.initializeLoading()]
                  }
                }
                var dataItem = self.initializeDataItem(data[i])
                self.$set(oriParent, i, dataItem)
              }
            } else {
              oriNode.model[self.childrenFieldName] = []
            }
          })
        }
      }
    },
    onItemDragStart (e, oriNode, oriItem) {
      if (!this.draggable || oriItem.dragDisabled) { return false }
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text', null)
      this.draggedElm = e.target
      this.draggedItem = {
        item: oriItem,
        parentItem: oriNode.parentItem,
        index: oriNode.parentItem.findIndex(t => t.id === oriItem.id)
      }

      this.$emit('item-drag-start', oriNode, oriItem, e)
    },
    onItemDragEnd (e, oriNode, oriItem) {
      this.draggedItem = undefined
      this.draggedElm = undefined
      this.$emit('item-drag-end', oriNode, oriItem, e)
    },
    onItemDrop (e, oriNode, oriItem) {
      if (!this.draggable || !!oriItem.dropDisabled) { return false }
      this.$emit('item-drop-before', oriNode, oriItem, !this.draggedItem ? undefined : this.draggedItem.item, e)
      if (!this.draggedElm || this.draggedElm === e.target || this.draggedElm.contains(e.target)) {
        return
      }
      if (this.draggedItem) {
        if (this.draggedItem.parentItem === oriItem[this.childrenFieldName] ||
                            this.draggedItem.item === oriItem ||
                            (oriItem[this.childrenFieldName] && oriItem[this.childrenFieldName].findIndex(t => t.id === this.draggedItem.item.id) !== -1)) {
          return
        }
        if (oriItem[this.childrenFieldName]) {
          oriItem[this.childrenFieldName].push(this.draggedItem.item)
        } else {
          oriItem[this.childrenFieldName] = [this.draggedItem.item]
        }
        oriItem.opened = true
        var draggedItem = this.draggedItem
        this.$nextTick(() => {
          draggedItem.parentItem.splice(draggedItem.index, 1)
        })
        this.$emit('item-drop', oriNode, oriItem, draggedItem.item, e)
      }
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
