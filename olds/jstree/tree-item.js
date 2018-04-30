export default {
  name: 'TreeItem',
  props: {
    data: {type: Object, required: true},
    textFieldName: {type: String},
    valueFieldName: {type: String},
    childrenFieldName: {type: String},
    itemEvents: {type: Object},
    wholeRow: {type: Boolean, default: false},
    showCheckbox: {type: Boolean, default: false},
    allowTransition: {type: Boolean, default: true},
    height: {type: Number, default: 24},
    parentItem: {type: Array},
    draggable: {type: Boolean, default: false},
    dragOverBackgroundColor: {type: String},
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
    klass: String
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
  }
}
