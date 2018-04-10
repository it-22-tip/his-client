<template>
  <layout-one>
    <md-content>
      <div v-for="item in icon.material" :key="item.code">
          <md-icon>{{ item.text }}</md-icon>
      </div>
    </md-content>
  </layout-one>
</template>

<script>
  import file from '@/mixins/file'
  import {chunk, keyBy, values} from 'lodash'
  export default {
    mixins: [
      file
    ],
    data () {
      return {
        icon: {}
      }
    },
    components: {
      'base-button': () => import('@partials/base-button'),
      'layout-one': () => import('@partials/layout-one')
    },
    mounted () {
      this.materialIcon().then((data) => {
        // data = keyBy(data, (item) => {return item.code})
        // data = values(data)
        // data = chunk(data, 6)
        // console.log(data)
        this.icon.material = data//chunk(data, 6)
      })
    },
    methods: {
      logOut () {
        this.$router.push({ name: 'base.login' })
      },
      async materialIcon () {
        return this.readJSON(__static + '/json/material-icon.json')
      }
    }
  }
</script>
