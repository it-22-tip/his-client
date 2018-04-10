'use strict'

import {extend as lodashExtend} from 'lodash'

const simpleConvertTreeToList = function (root) {
  const visitNode = function (node, hashMap, array) {
    if (!hashMap[node.data]) {
      hashMap[node.data] = true
      array.push(node)
    }
  }

  const convert = function (root) {
    let stack = []
    let array = []
    let hashMap = {}
    stack.push(root)

    while (stack.length !== 0) {
      var node = stack.pop()
      if (node.children === null) {
        visitNode(node, hashMap, array)
      } else {
        for (var i = node.children.length - 1; i >= 0; i--) {
          stack.push(node.children[i])
        }
      }
    }
    return array
  }

  return convert(root)
}

const treeFlatten = function (treeObj, idAttr, parentAttr, childrenAttr, levelAttr) {
  if (!idAttr) idAttr = 'id'
  if (!parentAttr) parentAttr = 'parent_id'
  if (!childrenAttr) childrenAttr = 'children'
  if (!levelAttr) levelAttr = 'level'

  function flattenChild (childObj, parentId, level) {
    let array = []

    let childCopy = lodashExtend({}, childObj)
    childCopy[levelAttr] = level
    childCopy[parentAttr] = parentId
    delete childCopy[childrenAttr]
    array.push(childCopy)

    array = array.concat(processChildren(childObj, level))

    return array
  }

  function processChildren (obj, level) {
    if (!level) level = 0
    let array = []

    obj[childrenAttr].forEach(function (childObj) {
      array = array.concat(flattenChild(childObj, obj[idAttr], level + 1))
    })

    return array
  }

  let result = processChildren(treeObj)
  return result
}

const treeFlattenEs6 = (children, getChildren, level, parent) => Array.prototype.concat.apply(
  children.map(x => ({ ...x, level: level || 1, parent: parent || null })),
  children.map(x => treeFlattenEs6(getChildren(x) || [], getChildren, (level || 1) + 1, x.id))
)

const treeFlattenBase = (base, idAttr) => {
  let array = []
  base.forEach(
    function (b) {
      array = array.concat(treeFlatten(b, idAttr))
    }
  )
  return array
}

const treeify = function (list, idAttr, parentAttr, childrenAttr) {
  if (!idAttr) idAttr = 'id'
  if (!parentAttr) parentAttr = 'parent_id'
  if (!childrenAttr) childrenAttr = 'children'

  let treeList = []
  let lookup = {}
  list.forEach(function (obj) {
    lookup[obj[idAttr]] = obj
    obj[childrenAttr] = []
  })
  list.forEach(function (obj) {
    if (obj[parentAttr] !== 0) {
      lookup[obj[parentAttr]][childrenAttr].push(obj)
    } else {
      treeList.push(obj)
    }
  })
  return treeList
}

const treeifyperformants = function (items, config) {
  if (config === void 0) { config = { id: 'id', parentId: 'parentId' } }
  let rootItems = [] // the resulting unflattened tree
  let lookup = {} // stores all already processed items with ther ids as key so we can look them up

  /*
    idea of this loop:
    whenever an item has a parent, but the parent is not yet in the lookup object, we store a preliminary parent
    in the lookup object and fill it with the data of the parent later
    if an item has no parentId, add it as a root element to rootItems
  */

  for (let _i = 0, items1 = items; _i < items1.length; _i++) {
    let item = items1[_i]
    let itemId = item[config.id]
    let parentId = item[config.parentId]

    // look whether item already exists in the lookup table
    if (!Object.prototype.hasOwnProperty.call(lookup, itemId)) {
      // item is not yet there, so add a preliminary item (its data will be added later)
      lookup[itemId] = { data: null, children: [] }
    }
    // add the current item's data to the item in the lookup table
    lookup[itemId].data = item
    let TreeItem = lookup[itemId]
    if (parentId === 0) {
      // is a root item
      rootItems.push(TreeItem)
    } else {
      // has a parent
      // look whether the parent already exists in the lookup table
      if (!Object.prototype.hasOwnProperty.call(lookup, parentId)) {
        // parent is not yet there, so add a preliminary parent (its data will be added later)
        lookup[parentId] = { data: null, children: [] }
      }
      // add the current item to the parent
      lookup[parentId].children.push(TreeItem)
    }
  }
  return rootItems
}

export {treeFlatten, treeFlattenEs6, treeFlattenBase, treeify, treeifyperformants, simpleConvertTreeToList}
