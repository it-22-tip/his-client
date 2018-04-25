<template>
  <li
    :class="classes"
    :draggable="draggable"
    @dragstart.stop="onItemDragStart($event, _self, _self.model)"
    @dragend.stop.prevent="onItemDragEnd($event, _self, _self.model)"
    @dragover.stop.prevent="() => false"
    @dragenter.stop.prevent="isDragEnter = true"
    @dragleave.stop.prevent="isDragEnter = false"
    @drop.stop.prevent="handleItemDrop($event, _self, _self.model)">
    <div
      v-if="isWholeRow"
      :class="wholeRowClasses">&nbsp;</div>
    <i
      class="tree-icon tree-ocl"
      @click="handleItemToggle"/>
    <div
      :class="anchorClasses"
      @click="handleItemClick"
      @mouseover="isHover=true"
      @mouseout="isHover=false">
      <i
        v-if="showCheckbox && !model.loading"
        class="tree-icon tree-checkbox"/>
      <i
        v-if="!model.loading"
        :class="themeIconClasses"/>
      {{ model.text }}
    </div>
    <ul
      v-if="isFolder"
      ref="group"
      role="group"
      class="tree-children">
      <tree-view-item
        v-for="(child, index) in model.children"
        :key="index"
        :data="child"
        :whole-row="wholeRow"
        :show-checkbox="showCheckbox"
        :height= "height"
        :parent-item="model.children"
        :draggable="draggable"
        :on-item-click="onItemClick"
        :on-item-toggle="onItemToggle"
        :on-item-drag-start="onItemDragStart"
        :on-item-drag-end="onItemDragEnd"
        :on-item-drop="onItemDrop"
        :index="index"
        :klass="index === model.children.length-1 ? 'tree-last' : ''"
      />
    </ul>
  </li>
</template>
<script>
export default {
  name: 'TreeViewItem',
  props: {
    data: {
      type: Object,
      required: true
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
    klass: String,
    last: false,
    index: false
  },
  data () {
    return {
      isHover: false,
      isDragEnter: false,
      model: this.data
    }
  },
  computed: {
    isFolder () {
      return this.model.children && this.model.children.length
    },
    classes () {
      return [
        {'tree-node': true},
        {'tree-open': this.model.opened},
        {'tree-closed': !this.model.opened},
        {'tree-leaf': !this.isFolder},
        {'tree-loading': !!this.model.loading},
        {'tree-drag-enter': this.isDragEnter},
        {[this.klass]: !!this.klass}
      ]
    },
    anchorClasses () {
      return [
        {'tree-anchor': true},
        {'tree-disabled': this.model.disabled},
        {'tree-selected': this.model.selected},
        {'tree-hovered': this.isHover}
      ]
    },
    wholeRowClasses () {
      return [
        {'tree-wholerow': true},
        {'tree-wholerow-clicked': this.model.selected},
        {'tree-wholerow-hovered': this.isHover}
      ]
    },
    themeIconClasses () {
      return [
        {'tree-icon': true},
        {'tree-themeicon': true},
        {[this.model.icon]: !!this.model.icon},
        {'tree-themeicon-custom': !!this.model.icon}
      ]
    },
    isWholeRow () {
      if (this.wholeRow) {
        if (this.$parent.model === undefined) {
          return true
        } else if (this.$parent.model.opened === true) {
          return true
        } else {
          return false
        }
      }
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
    data (newValue) {
      this.model = newValue
    },
    'model.opened': {
      handler: function (val, oldVal) {
        this.onItemToggle(this, this.model)
        this.handleSetGroupMaxHeight()
      },
      deep: true
    }
  },
  mounted () {
    this.handleSetGroupMaxHeight()
  },
  methods: {
    handleRecursionNodeParents (node, func) {
      if (node.$parent) {
        func(node.$parent)
        this.handleRecursionNodeParents(node.$parent, func)
      }
    },
    handleItemToggle () {
      if (this.isFolder) {
        this.model.opened = !this.model.opened
        this.onItemToggle(this, this.model)
        this.handleSetGroupMaxHeight()
      }
    },
    handleGroupMaxHeight () {
      let length = 0
      let childHeight = 0
      if (this.model.opened) {
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
        this.handleRecursionNodeParents(self, node => {
          if (node.$refs.group) {
            node.$refs.group.style.maxHeight = node.handleGroupMaxHeight() + 'px'
          }
        })
      })
    },
    handleItemClick () {
      if (this.model.disabled) return
      this.model.selected = !this.model.selected
      this.onItemClick(this, this.model)
    },
    handleItemDrop (e, oriNode, oriItem) {
      this.$el.style.backgroundColor = 'inherit'
      this.onItemDrop(e, oriNode, oriItem)
    }
  }
}
</script>
