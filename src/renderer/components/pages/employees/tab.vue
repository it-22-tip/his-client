<template>
  <layout-one>
    <md-toolbar
      class="md-dense md-primary"
      md-elevation="0">
      <md-button
        class="md-icon-button"
        @click="$router.push({ name: 'base.dashboard' })">
        <md-icon>close</md-icon>
      </md-button>
    </md-toolbar>
    <md-tabs :md-active-tab="activeTabs">
      <md-tab
        v-for="item in tabs"
        :key="item.id"
        :id="item.id"
        :md-label="item.label"
        :to="{ name: item.name, params: item.params }"/>
    </md-tabs>
    <md-content class="ctc">
      <router-view/>
    </md-content>
  </layout-one>
</template>

<script>
import { find } from 'lodash'
export default {
  components: {
    'layout-one': () => import('@partials/layout-one')
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
          id: 'EmployeesTabs',
          name: 'employees.employee.list',
          params: { page: 1, sort: 'Ein', order: 'asc' },
          label: 'Karyawan'
        },
        {
          id: 'EmployeesLicenses',
          name: 'employees.license.list',
          params: { page: 1, sort: 'Name', order: 'asc' },
          label: 'Surat Izin'
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
</style>
