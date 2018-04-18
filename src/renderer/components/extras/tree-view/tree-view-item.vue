<template>
  <li role="treeitem"
    :class="classes"
    :draggable="draggable"
    @dragstart.stop="onItemDragStart($event, _self, _self.treeModel)"
    @dragend.stop.prevent="onItemDragEnd($event, _self, _self.treeModel)"
    @dragover.stop.prevent="() => false"
    @dragenter.stop.prevent="isDragEnter = true"
    @dragleave.stop.prevent="isDragEnter = false"
    @drop.stop.prevent="handleItemDrop($event, _self, _self.treeModel)">
    <div role="presentation" :class="wholeRowClasses" v-if="isWholeRow">&nbsp;</div>
    <i class="tree-icon tree-ocl" role="presentation" @click="handleItemToggle"></i>
    <div :class="anchorClasses" v-on="events">
      <i class="tree-icon tree-checkbox" role="presentation" v-if="showCheckbox && !treeModel.loading"></i>
      <i :class="themeIconClasses" role="presentation" v-if="!treeModel.loading"></i>
      {{treeModel[textFieldName]}}
    </div>
    <ul role="group" ref="group" class="tree-children" v-if="isFolder">
      <tree-item v-for="(child, index) in treeModel.children"
        :key="index"
        :tree-data="child"
        :text-field-name="textFieldName"
        :value-field-name="valueFieldName"
        :item-events="itemEvents"
        :whole-row="wholeRow"
        :show-checkbox="showCheckbox"
        :height= "height"
        :parent-item="treeModel.children"
        :draggable="draggable"
        :on-item-click="onItemClick"
        :on-item-toggle="onItemToggle"
        :on-item-drag-start="onItemDragStart"
        :on-item-drag-end="onItemDragEnd"
        :on-item-drop="onItemDrop">
      </tree-item>
    </ul>
  </li>
</template>
<script>
export default {
  name: 'TreeViewItem',
  props: {
    treeData: {
      type: Object,
      required: true
    },
    textFieldName: {
      type: String
    },
    valueFieldName: {
      type: String
    },
    itemEvents: {
      type: Object
    },
    wholeRow: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 24
    },
    parentItem: {
      type: Array
    },
    draggable: {
      type: Boolean,
      default: false
    },
    onItemClick: {
      type: Function,
      default: () => false
    },
    onItemToggle: {
      type: Function,
      default: () => false
    },
    onItemDragStart: {
      type: Function,
      default: () => false
    },
    onItemDragEnd: {
      type: Function,
      default: () => false
    },
    onItemDrop: {
      type: Function,
      default: () => false
    },
    treeClass: String
  },
  data () {
    return {
      isHover: false,
      isDragEnter: false,
      treeModel: this.treeData,
      events: {}
    }
  },
  watch: {
    isDragEnter (newValue) {
      if (newValue) {
        this.$el.style.backgroundColor = '#C9FDC9'
      } else {
        this.$el.style.backgroundColor = 'inherit'
      }
    },
    treeData (newValue) {
      this.treeModel = newValue
    },
    'treeModel.opened': {
      handler: function (val, oldVal) {
        this.onItemToggle(this, this.treeModel)
        this.handleSetGroupMaxHeight()
      },
      deep: true
    }
  },
  computed: {
    isFolder () {
      return this.treeModel.children && this.treeModel.children.length
    },
    classes () {
      return [
        {'tree-node': true},
        {'tree-open': this.treeModel.opened},
        {'tree-closed': !this.treeModel.opened},
        {'tree-leaf': !this.isFolder},
        {'tree-loading': !!this.treeModel.loading},
        {'tree-drag-enter': this.isDragEnter},
        {[this.treeClass]: !!this.treeClass}
      ]
    },
    anchorClasses () {
      return [
        {'tree-anchor': true},
        {'tree-disabled': this.treeModel.disabled},
        {'tree-selected': this.treeModel.selected},
        {'tree-hovered': this.isHover}
      ]
    },
    wholeRowClasses () {
      return [
        {'tree-wholerow': true},
        {'tree-wholerow-clicked': this.treeModel.selected},
        {'tree-wholerow-hovered': this.isHover}
      ]
    },
    themeIconClasses () {
      return [
        {'tree-icon': true},
        {'tree-themeicon': true},
        {[this.treeModel.icon]: !!this.treeModel.icon},
        {'tree-themeicon-custom': !!this.treeModel.icon}
      ]
    },
    isWholeRow () {
      if (this.wholeRow) {
        if (this.$parent.treeModel === undefined) {
          return true
        } else if (this.$parent.treeModel.opened === true) {
          return true
        } else {
          return false
        }
      }
    }
  },
  methods: {
    handleRecursionTreeNodeParents (treeNode, func) {
      if (treeNode.$parent) {
        func(treeNode.$parent)
        this.handleRecursionTreeNodeParents(treeNode.$parent, func)
      }
    },
    handleItemToggle () {
      if (this.isFolder) {
        this.treeModel.opened = !this.treeModel.opened
        this.onItemToggle(this, this.treeModel)
        this.handleSetGroupMaxHeight()
      }
    },
    handleGroupMaxHeight () {
      let length = 0
      let childHeight = 0
      if (this.treeModel.opened) {
        length = this.$children.length
        for (let children of this.$children) {
          childHeight += children.handleGroupMaxHeight()
        }
      }
      return length * this.height + childHeight
    },
    handleSetGroupMaxHeight () {
      if (this.$refs.group) {
        this.$refs.group.style.maxHeight = this.handleGroupMaxHeight() + 'px'
      }
      var self = this
      this.$nextTick(() => {
        this.handleRecursionTreeNodeParents(self, treeNode => {
          if (treeNode.$refs.group) {
            treeNode.$refs.group.style.maxHeight = treeNode.handleGroupMaxHeight() + 'px'
          }
        })
      })
    },
    handleItemClick () {
      if (this.treeModel.disabled) return
      this.treeModel.selected = !this.treeModel.selected
      this.onItemClick(this, this.treeModel)
    },
    handleItemMouseOver () {
      this.isHover = true
    },
    handleItemMouseOut () {
      this.isHover = false
    },
    handleItemDrop (e, oritreeNode, oriItem) {
      this.$el.style.backgroundColor = 'inherit'
      this.onItemDrop(e, oritreeNode, oriItem)
    }
  },
  created () {
    const self = this
    const events = {
      'click': this.handleItemClick,
      'mouseover': this.handleItemMouseOver,
      'mouseout': this.handleItemMouseOut
    }
    for (let itemEvent in this.itemEvents) {
      let itemEventCallback = this.itemEvents[itemEvent]
      if (events.hasOwnProperty(itemEvent)) {
        let eventCallback = events[itemEvent]
        events[itemEvent] = function (event) {
          eventCallback(self, self.treeModel, event)
          itemEventCallback(self, self.treeModel, event)
        }
      } else {
        events[itemEvent] = function (event) {
          itemEventCallback(self, self.treeModel, event)
        }
      }
    }
    this.events = events
  },
  mounted () {
    this.handleSetGroupMaxHeight()
  }
}
</script>

<style lang="scss" scoped>
@import "./scss/all";
</style>


