let ITEM_ID = 0

class Model {
  constructor (item, textFieldName, valueFieldName, childrenFieldName, collapse, self) {
    this.id = item.id || ITEM_ID++
    this[childrenFieldName] = item[childrenFieldName]
    this[textFieldName] = item[textFieldName] || ''
    this[valueFieldName] = item[valueFieldName] || item[textFieldName]
    this.icon = item.icon || ''
    this.opened = item.opened || collapse
    this.selected = item.selected || false
    this.disabled = item.disabled || false
    this.loading = item.loading || false
    this[this.childrenFieldName] = item[this.childrenFieldName] || []
  }
  addBefore (data, selectedNode) {
    let newItem = self.initializeDataItem(data)
    let index = selectedNode.parentItem.indexOf(this.item)
    selectedNode.parentItem.splice(index, 0, newItem)
  }
  addAfter (data, selectedNode) {
    let newItem = self.initializeDataItem(data)
    let index = selectedNode.parentItem.indexOf(this.item) + 1
    selectedNode.parentItem.splice(index, 0, newItem)
  }
  addChild (data) {
    let newItem = self.initializeDataItem(data)
    this.item[this.childrenFieldName].push(newItem)
  }
  openChildren () {
    this.item.opened = true
    self.handleRecursionNodeChildren(this.item, node => {
      this.item.opened = true
    })
  }
  closeChildren () {
    this.item.opened = false
    self.handleRecursionNodeChildren(this.item, node => {
      this.item.opened = false
    })
  }
}

export default Model
