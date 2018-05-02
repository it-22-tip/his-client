<template>
  <li
    :class="classes"
    :draggable="draggable"
    role="treeitem"
    @dragstart.stop="onItemDragStart($event, _self, _self.model)"
    @dragend.stop.prevent="onItemDragEnd($event, _self, _self.model)"
    @dragover.stop.prevent="isDragEnter = true"
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
      <slot
        :vm="this"
        :model="model">
        <i
          v-if="!model.loading"
          :class="themeIconClasses"
          role="presentation"/>
        <span v-html="model[textFieldName]"/>
      </slot>
    </div>
    <ul
      v-if="isFolder"
      ref="group"
      :style="groupStyle"
      class="tree-children"
      role="group">
      <tree-view-item
        v-for="(child, index) in model[childrenFieldName]"
        :key="index"
        :data="child"
        :text-field-name="textFieldName"
        :value-field-name="valueFieldName"
        :children-field-name="childrenFieldName"
        :item-events="itemEvents"
        :whole-row="wholeRow"
        :show-checkbox="showCheckbox"
        :allow-transition="allowTransition"
        :height= "height"
        :parent-item="model[childrenFieldName]"
        :draggable="draggable"
        :drag-over-background-color="dragOverBackgroundColor"
        :on-item-click="onItemClick"
        :on-item-toggle="onItemToggle"
        :on-item-drag-start="onItemDragStart"
        :on-item-drag-end="onItemDragEnd"
        :on-item-drop="onItemDrop"
        :item-class="index === model[childrenFieldName].length-1?'tree-last':''">
        <template slot-scope="_">
          <slot
            :vm="_.vm"
            :model="_.model">
            <i
              v-if="!model.loading"
              :class="_.vm.themeIconClasses"
              role="presentation"/>
            <span v-html="_.model[textFieldName]"/>
          </slot>
        </template>
      </tree-view-item>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeViewItem',
  props: {
    data: {type: Object, required: true},
    textFieldName: {type: String, default: 'text'},
    valueFieldName: {type: String, default: 'value'},
    childrenFieldName: {type: String, default: 'children'},
    itemEvents: {type: Object, default: () => ({})},
    wholeRow: {type: Boolean, default: false},
    showCheckbox: {type: Boolean, default: false},
    allowTransition: {type: Boolean, default: true},
    height: {type: Number, default: 24},
    parentItem: {type: Array, default: () => ({})},
    draggable: {type: Boolean, default: false},
    dragOverBackgroundColor: {type: String, default: ''},
    onItemClick: {type: Function, default: () => false},
    onItemToggle: {type: Function, default: () => false},
    onItemDragStart: {type: Function, default: () => false},
    onItemDragEnd: {type: Function, default: () => false},
    onItemDrop: {type: Function, default: () => false},
    itemClass: {type: String, default: ''}
  },
  data () {
    return {
      isHover: false,
      isDragEnter: false,
      model: this.data,
      maxHeight: 0,
      events: {}
    }
  },
  computed: {
    isFolder () {
      return this.model[this.childrenFieldName] && this.model[this.childrenFieldName].length
    },
    classes () {
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
    },
    groupStyle () {
      return {
        'position': this.model.opened ? '' : 'relative',
        'max-height': this.allowTransition ? this.maxHeight + 'px' : '',
        'transition-duration': this.allowTransition ? Math.ceil(this.model[this.childrenFieldName].length / 100) * 300 + 'ms' : '',
        'transition-property': this.allowTransition ? 'max-height' : '',
        'display': this.allowTransition ? 'block' : (this.model.opened ? 'block' : 'none')
      }
    }
  },
  watch: {
    isDragEnter (newValue) {
      if (newValue) {
        this.$el.style.backgroundColor = this.dragOverBackgroundColor
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
        this.handleGroupMaxHeight()
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
    this.handleGroupMaxHeight()
  },
  methods: {
    handleItemToggle (e) {
      if (this.isFolder) {
        this.model.opened = !this.model.opened
        this.onItemToggle(this, this.model)
      }
    },
    handleGroupMaxHeight () {
      if (this.allowTransition) {
        let length = 0
        let childHeight = 0
        if (this.model.opened) {
          length = this.$children.length
          for (let children of this.$children) {
            childHeight += children.maxHeight
          }
        }
        this.maxHeight = length * this.height + childHeight
        if (this.$parent.$options._componentTag === 'tree-item') {
          this.$parent.handleGroupMaxHeight()
        }
      }
    },
    handleItemClick (e) {
      if (this.model.disabled) return
      this.model.selected = !this.model.selected
      this.onItemClick(this, this.model, e)
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
