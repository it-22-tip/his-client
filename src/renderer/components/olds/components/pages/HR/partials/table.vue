<template>
  <md-table
    v-model="searched"
    class="hr-table"
    md-elevation="0"
    md-sort="id"
    md-sort-order="asc"
    md-fixed-header>
    <md-table-empty-state
      :md-description="`Pencarian '${search}'. Coba Yang Lain.`"
      md-label="No users found">
      <md-button class="md-primary md-raised">Create New User</md-button>
    </md-table-empty-state>

    <md-table-toolbar md-elevation="0">
      <md-button @click="clickFilter">Filter</md-button>
    </md-table-toolbar>

    <md-table-row
      slot="md-table-row"
      slot-scope="{ item }"
      :class="item.class">
      <!-- <md-table-cell md-label="No" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell> -->
      <md-table-cell
        md-label="id"
        md-sort-by="id">{{ item.id }}</md-table-cell>
      <md-table-cell
        md-label="nip"
        md-sort-by="pre_nip">{{ item.pre_nip }}</md-table-cell>
      <md-table-cell
        md-label="Nama"
        md-sort-by="name">{{ item.name }}</md-table-cell>
      <!-- <md-table-cell md-label="JK" md-sort-by="gender">{{ item.gender }}</md-table-cell>
        <md-table-cell md-label="Umur" md-sort-by="age" md-numeric>{{ item.age }}</md-table-cell>
        <md-table-cell md-label="Masa Kerja" md-sort-by="time_of_service" md-numeric>{{ item.time_of_service }}</md-table-cell>
        <md-table-cell md-label="TTL">{{ item.birth_date_place }}</md-table-cell> -->
      <md-table-cell md-label="">
        <md-button
          class="md-icon-button"
          @click="clickEdit(item)">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="top">Edit</md-tooltip>
        </md-button>
      </md-table-cell>
      <md-table-cell md-label="">
        <md-button
          v-if="item.warning"
          class="md-icon-button">
          <md-icon>warning</md-icon>
          <md-tooltip md-direction="top">Data Tidak Lengkap</md-tooltip>
        </md-button>
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { mapValues, pick, assign, map } from 'lodash'
import { models } from '@/orm'
import findAll from '@/crud/employee/findAll'

const toLower = text => {
  return text.toString().toLowerCase()
}

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)))
  }
  return items
}

export default {
  name: 'TableSearch',
  data: () => ({
    search: null,
    searched: [],
    users: [],
    selected: [],
    searchtool: null
  }),
  mounted () {
    this.getEmpl()
  },
  methods: {
    clickFilter () {
      this.$emit('filter')
    },
    getClass (item) {
      if (item.id === 1) {
        return 'error'
      }
      if (item.birth_date === '') {
        return 'warning'
      }
    },
    searchOnTable () {
      this.searched = searchByName(this.users, this.search)
    },
    pad (num, size) {
      let string = num + ''
      while (string.length < size) string = '0' + string
      return string
    },
    clickEdit (item) {
      this.$router.push({
        name: 'page.hr.employee.detail',
        params: {
          id: item.db_id
        }
      })
    },
    getEmpl () {
      const options = {}
      options.attribute = {

      }
      findAll().then(
        (data) => {
          let employee = []
          let id = 0
          for (let e of data) {
            id++
            employee.push(
              {
                id: id,
                db_id: e.id,
                pre_nip: e.birth_date + '-' + this.pad(e.pre_nip, 5),
                name: e.name,
                gender: e.gender,
                age: +(moment().diff(moment(e.birth_date, 'YYYY-MM-DD', true), 'years')),
                time_of_service: +(moment().diff(moment(e.accepted_date, 'YYYY-MM-DD', true), 'month')),
                birth_date_place: e.birth_date + ', ' + e['birth_place_regency.name'],
                warning: !!((e.id === 1 || e.id === 10)),
                class: []
              }
            )
          }
          this.searched = employee
        }
      )
    }
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
  .full {

  }
</style>
