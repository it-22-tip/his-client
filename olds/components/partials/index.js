import Vue from 'vue'
const files = require.context('.', true, /\.vue$/)

files.keys().forEach(key => {
  if (key === './index.js') return
  let name = key.replace(/(\.\/|\.vue)/g, '').replace(/\//g, '').replace(/([A-Z])/g, (str) => { return '-' + str.toLowerCase() }).substring(1)
  Vue.component(name, files(key).default)
})
