<template>
  <layout-one>
    <md-toolbar
      class="ptb"
      md-elevation="0">
      <md-tabs :md-active-tab="activeTabs">
        <md-tab
          v-for="item in tabs"
          :key="item.id"
          :id="item.id"
          :md-label="item.label"
          :to="{ name: item.name, params: item.params }"/>
      </md-tabs>
    </md-toolbar>
    <md-content class="ctc">
      <router-view/>
    </md-content>
  </layout-one>
</template>

<script>
import { find } from 'lodash'
export default {
  components: {
    'layout-one': () => import('@components/layout-tab')
  },
  props: {
    page: {
      type: Number,
      default: 1
    },
    sort: {
      type: String,
      default: null
    },
    order: {
      type: String,
      default: 'asc'
    }
  },
  data () {
    return {
      pageTitle: null,
      activeTab: null,
      tabs: [
        {
          id: 'ProvincesTab',
          name: 'masterdata.provinces',
          params: { page: 1, sort: 'Name', order: 'asc' },
          label: 'Provinsi'
        },
        {
          id: 'RegenciesTab',
          name: 'masterdata.regencies',
          params: { page: 1, sort: 'Name', order: 'asc' },
          label: 'Kota/Kabupaten'
        },
        {
          id: 'DistrictsTab',
          name: 'masterdata.districts',
          params: { page: 1, sort: 'Name', order: 'asc' },
          label: 'Kecamatan'
        },
        {
          id: 'VillagesTab',
          name: 'masterdata.villages',
          params: { page: 1, sort: 'Name', order: 'asc' },
          label: 'Desa'
        },
        {
          id: 'JobTitleTab',
          name: 'masterdata.jobtitles',
          params: { page: 1, sort: 'Name', order: 'asc' },
          label: 'Posisi'
        }
      ]
    }
  },
  computed: {
    activeTabs: {
      get () {
        return find(this.tabs, { name: this.$route.name }).id
      },
      set () {
      }
    }
  },
  mounted () {
    console.log(this.$route)
    console.log(JSON.stringify(this.$route.params))
    console.log(JSON.stringify(this.$props))
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.ctc {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.ptb.md-toolbar {
  padding: 0;
  // border-bottom: 1px solid #cccccc;
  min-height: 48px;
  height: 48px;
}
.ptb.md-toolbar .md-tabs {
  margin: 0;
  padding: 0;
}
</style>
