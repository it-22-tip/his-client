<template>
  <li
    :class="classes"
    :draggable="draggable"
    role="treeitem"
    @dragstart.stop="onItemDragStart($event, _self, _self.model)"
    @dragend.stop.prevent="onItemDragEnd($event, _self, _self.model)"
    @dragover.stop.prevent="() => false"
    @dragenter.stop.prevent="isDragEnter = true"
    @dragleave.stop.prevent="isDragEnter = false"
    @drop.stop.prevent="handleItemDrop($event, _self, _self.model)">
    <div
      v-if="isWholeRow"
      :class="wholeRowClasses"
      role="presentation">&nbsp;</div>
    <i
      class="tree-icon tree-ocl"
      role="presentation"
      @click="handleItemToggle"/>
    <div
      :class="anchorClasses"
      v-on="events">
      <i
        v-if="showCheckbox && !model.loading"
        class="tree-icon tree-checkbox"
        role="presentation"/>
      <i
        v-if="!model.loading"
        :class="themeIconClasses"
        role="presentation"/>
      {{ model[textFieldName] }}
    </div>
    <ul
      v-if="isFolder"
      ref="group"
      role="group"
      class="tree-children">
      <tree-view-item
        v-for="(child, index) in model[childrenFieldName]"
        :key="index"
        :item-data="child"
        :text-field-name="textFieldName"
        :value-field-name="valueFieldName"
        :children-field-name="childrenFieldName"
        :item-events="itemEvents"
        :whole-row="wholeRow"
        :show-checkbox="showCheckbox"
        :height= "height"
        :parent-item="model[childrenFieldName]"
        :draggable="draggable"
        :on-item-click="onItemClick"
        :on-item-toggle="onItemToggle"
        :on-item-drag-start="onItemDragStart"
        :on-item-drag-end="onItemDragEnd"
        :on-item-drop="onItemDrop"
        :item-class="index === model[childrenFieldName].length-1 ? 'tree-last' : ''"/>
    </ul>
  </li>
</template>
<script>
// import Model from './model'
export default {
  name: 'TreeViewItem',
  props: {
    itemData: {type: Object, required: true, default: () => {}},
    textFieldName: {type: String, default: null},
    valueFieldName: {type: String, default: null},
    childrenFieldName: {type: String, default: null},
    itemEvents: {type: Object, default: () => null},
    wholeRow: {type: Boolean, default: false},
    showCheckbox: {type: Boolean, default: false},
    height: {type: Number, default: 24},
    parentItem: {type: Array, default: () => {}},
    draggable: {type: Boolean, default: false},
    onItemClick: {
      type: Function, default: () => false
    },
    onItemToggle: {
      type: Function, default: () => false
    },
    onItemDragStart: {
      type: Function, default: () => false
    },
    onItemDragEnd: {
      type: Function, default: () => false
    },
    onItemDrop: {
      type: Function, default: () => false
    },
    itemClass: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isHover: false,
      isDragEnter: false,
      model: this.itemData,
      events: {}
    }
  },
  computed: {
    isFolder () {
      return this.model[this.childrenFieldName] && this.model[this.childrenFieldName].length
    },
    classes () {
      console.log({on: 'computed classes', model: this.model})
      return [
        {'tree-node': true},
        {'tree-open': this.model.opened},
        {'tree-closed': !this.model.opened},
        {'tree-leaf': !this.isFolder},
        {'tree-loading': !!this.model.loading},
        {'tree-drag-enter': this.isDragEnter},
        {[this.itemClass]: !!this.itemClass}
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
    itemData (newValue) {
      // newValue instanceof()
      console.log({on: 'watch itemData', model: newValue})
      this.model = newValue
    },
    'model.opened': {
      handler: function (val, oldVal) {
        console.log({on: 'watch model.opened', model: this.model})
        this.onItemToggle(this, this.model)
        this.handleSetGroupMaxHeight()
      },
      deep: true
    },
    model: {
      handler: function (val) {
        console.log({on: 'watch model', model: this.model})
      },
      deep: true
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
          eventCallback(self, self.model, event)
          itemEventCallback(self, self.model, event)
        }
      } else {
        events[itemEvent] = function (event) {
          itemEventCallback(self, self.model, event)
        }
      }
    }
    this.events = events
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
        console.log({on: 'handleItemToggle', model: this.model})
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
        let height = this.handleGroupMaxHeight()
        this.$refs.group.style.maxHeight = height + 'px'
        if (height === 0) {
          this.$refs.group.style.display = 'none'
        } else {
          this.$refs.group.style.display = 'block'
        }
      }
      let self = this
      this.$nextTick().then(
        () => {
          this.handleRecursionNodeParents(self, node => {
            if (node.$refs.group) {
              let height = node.handleGroupMaxHeight()
              node.$refs.group.style.maxHeight = height + 'px'
              if (height === 0) {
                node.$refs.group.style.display = 'none'
              } else {
                node.$refs.group.style.display = 'block'
              }
            }
          })
        }
      )
    },
    handleItemClick () {
      if (this.model.disabled) return
      this.model.selected = !this.model.selected
      this.onItemClick(this, this.model)
    },
    handleItemMouseOver () {
      this.isHover = true
    },
    handleItemMouseOut () {
      this.isHover = false
    },
    handleItemDrop (e, oriNode, oriItem) {
      this.$el.style.backgroundColor = 'inherit'
      this.onItemDrop(e, oriNode, oriItem)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./scss/style";
</style>
