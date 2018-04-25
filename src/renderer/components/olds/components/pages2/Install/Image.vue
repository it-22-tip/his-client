<template>
  <md-content class="image-tabs">
    <md-content>
      <!-- <p>Image Tabs</p>
      <md-button>Upload All</md-button>
      <div v-for="item in images" :key="item.id">
        {{ item.id }}
        <img height="100" width="75" :src="item.url"/>
      </div> -->
      <md-table
        v-model="images"
        md-sort="id"
        md-sort-order="asc"
        md-fixed-header>
        <md-table-row
          slot="md-table-row"
          slot-scope="{ item }">
          <md-table-cell
            md-label="ID"
            md-sort-by="id">{{ item.id }}</md-table-cell>
          <md-table-cell md-label="Image"><img
            :src="item.url"
            height="100"
            width="75"></md-table-cell>
        </md-table-row>
      </md-table>
    </md-content>
  </md-content>
</template>

<script>
import fs from 'fs'
import { resolve } from 'dns'
export default {
  data () {
    return {
      images: []
    }
  },
  async mounted () {
    // console.log(this)
    // console.log(this.$worker)
    let images
    let path = __static + '/jpg/employee/300x400'
    images = await this.listImage(path)
    let listing = []
    for (let item of images) {
      let p = new Promise((resolve, reject) => {
        let img = fs.readFileSync(path + '/' + item)
        // console.log(img)
        let blob = new Blob([img], { type: 'image/jpg' })
        let r = new FileReader()
        r.addEventListener('loadend', () => {
          let i = { id: +(item.slice(0, -4)), image: img, blob: blob, url: r.result }
          resolve(i)
        })
        r.readAsDataURL(blob)
      })
      listing.push(p)
    }
    Promise.all(listing).then(
      (f) => {
        this.images = f
      }
    )
  },
  methods: {
    async listImage (path) {
      let stat = await new Promise((resolve, reject) => {
        let content = fs.readdirSync(path)
        resolve(content)
      })
      return stat
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-tabs {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .image-tabs > .md-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
</style>
