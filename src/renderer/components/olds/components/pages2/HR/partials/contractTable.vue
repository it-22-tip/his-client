<template>
    <md-table class="hr-table" v-model="searched" md-elevation="0" md-sort="NO" md-sort-order="asc" @md-selected="onSelect" md-fixed-header>
      <md-table-empty-state
        md-label="No users found"
        :md-description="`Pencarian '${search}'. Coba Yang Lain.`">
        <md-button class="md-primary md-raised" @click="newUser">Create New User</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" @md-selected="onSelect" :class="getClass(item)">
        <md-table-cell md-label="No" md-sort-by="NO" md-numeric>{{ item.NO }}</md-table-cell>
        <md-table-cell md-label="Nama" md-sort-by="NAMA">{{ item.NAMA }}</md-table-cell>
        <md-table-cell md-label="JK" md-sort-by="GENDER">{{ item.GENDER }}</md-table-cell>
        <md-table-cell md-label="Umur" md-sort-by="UMUR">{{ toUmur(item.TANGGAL_LAHIR) }}</md-table-cell>
        <md-table-cell md-label="TTL">{{ item.TEMPAT_LAHIR }}<br/>{{ item.TANGGAL_LAHIR }}</md-table-cell>
      </md-table-row>
    </md-table>
</template>

<script>
  import Vue from 'vue'
  import moment from 'moment'
  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.NAMA).includes(toLower(term)))
    }

    return items
  }

  export default {
    name: 'TableSearch',
    data: () => ({
      search: null,
      searched: [],
      users: [],
      selected: []
    }),
    methods: {
      getClass(item) {
        if (item.NO === 1) {
          return 'error'
        }
        if (item.TEMPAT_LAHIR === '') {
          return 'warning'
        }
      },
      toUmur (date) {
        let now = moment()
        let bd = moment(date, 'DD-MMMM-YYYY', true)
        let umur = now.diff(bd, 'years')
        return +umur
      },
      onSelect (selected) {
        this.$router.push({ name: 'page.hr.detail', params: { id: selected.NO }})
      },
      newUser () {
        window.alert('Noop')
      },
      searchOnTable () {
        this.searched = searchByName(this.users, this.search)
      },
      customSort (value) {
        return value.sort((a, b) => {
          const sortBy = this.currentSort

          if (this.currentSortOrder === 'desc') {
            return a[sortBy].localeCompare(b[sortBy])
          }

          return b[sortBy].localeCompare(a[sortBy])
        })
      }
    },
    created () {
      let fs = require('fs')
      const readFile = async () => {
        await fs.readFile(__static + '/employee.json', 'utf-8', (error, result) => {
          if (error) {
            throw error
          }
          result = JSON.parse(result)
          this.searched = Object.values(result)
        })
      }
      readFile()
      // this.searched = this.users
    }
  }
</script>
<style lang="scss">
  .hr-table {
    height: 100% !important;
    display: flex;
    flex-direction: column;
  }
  .hr-table .md-table-toolbar {

  }
  .hr-table .md-table-content {
    display: flex;
    flex: 1;
    overflow-y: scroll !important;
    height: 100% !important;
    max-height: none !important;
  }
  .hr-table .md-table-fixed-header {

  }
</style>
<style lang="scss" scoped>
  table .error {
    background-color: red;
    color: white;
    font-weight: bold;
  }
  table .warning {
    background-color: yellow;
    color: black;
    font-weight: bold;
  }
</style>
