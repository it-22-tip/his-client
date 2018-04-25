<template>
  <md-content class="table-tabs">
    <md-content>
      <md-table
        v-model="tables"
        md-fixed-header>
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">All Table</h1>
          </div>
          <div class="md-toolbar-section-end">
            <md-button
              class="md-icon-button"
              @click="processInsert">
              Insert
              <md-tooltip md-direction="top">Recreate All</md-tooltip>
            </md-button>
            <md-button
              class="md-icon-button"
              @click="recreateAll">
              <md-icon>autorenew</md-icon>
              <md-tooltip md-direction="top">Recreate All</md-tooltip>
            </md-button>
          </div>
        </md-table-toolbar>
        <md-table-row
          slot="md-table-row"
          slot-scope="{ item }">
          <md-table-cell
            md-label="Table"
            md-sort-by="name">{{ lowerCase(item.name) }}</md-table-cell>
          <md-table-cell md-label="">
            <md-button
              class="md-icon-button"
              @click="clickAddRemove(item)">
              <md-icon>{{ item.exists ? 'remove' : 'add' }}</md-icon><md-tooltip md-direction="top">{{ item.exists ? 'remove' : 'add' }}</md-tooltip>
            </md-button>
          </md-table-cell>
          <md-table-cell md-label="">
            <md-button
              class="md-icon-button"
              @click="clickSeed(item)">
              <md-icon>layers</md-icon>
              <md-tooltip md-direction="top">Seed Content</md-tooltip>
            </md-button>
          </md-table-cell>
          <md-table-cell md-label="">
            <md-button
              class="md-icon-button"
              @click="clickTruncate(item)">
              <md-icon>layers_clear</md-icon>
              <md-tooltip md-direction="top">Clear Content</md-tooltip>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </md-content>
    <md-snackbar
      :md-duration="3000"
      :md-active.sync="showSnackbar"
      md-persistent>
      {{ snackbarMessage }}Error
      <md-button
        class="md-primary"
        @click="toggleSnackbar">Retry</md-button>
    </md-snackbar>
  </md-content>
</template>

<script>
import fs from 'fs'
import { lowerCase, mapValues, find } from 'lodash'
import { models, connection } from '@/orm'
import { map } from 'lodash'
import bcrypt from 'bcryptjs'
export default {
  data () {
    return {
      tables: [],
      snackbarMessage: '',
      showSnackbar: false
    }
  },
  mounted () {
    console.log(this.tables)
    this.populateTables()
  },
  methods: {
    readImage (path) {
      let content
      try {
        content = fs.readFileSync(path)
      } catch (error) {
        content = null
      }
      return content
    },
    async processInsert () {
      for (let process of this.tables) {
        let { json, model, name } = process
        if (await this.fileExists(json)) {
          let data = await this.readFile(json)
          if (name === 'users') {
            data = map(data, item => {
              let salt = bcrypt.genSaltSync(10)
              item.pass_key = bcrypt.hashSync(item.pass_key, salt)
              item.salt = salt
              return item
            })
          }
          if (name === 'employees') {
            let id = 1
            // let dir = fs.readdirSync()
            // dir = map(dir, item => { return (item.slice(0, -4)) })
            for (let employee of data) {
              // employee.id = id
              // id++
              let path = __static + '/jpg/employee/300x400'
              try {
                employee.image = fs.readFileSync(path + '/' + employee.pre_nip + '.jpg')
              } catch (error) {
                employee.image = null
              }
            }
          }
          // console.log(data)
          await model.bulkCreate(data)
        }
      }
    },
    lowerCase: lowerCase,
    emitLogData (message) {
      this.$emit('log', {message: message, type: 'success'})
    },
    emitLogError (error) {
      if (error !== undefined && error.original !== undefined) {
        this.$emit('log', {message: error.original.message, type: 'error'})
      } else {
        this.toggleSnackbar('Error Happen')
      }
    },
    toggleSnackbar (message) {
      if (message !== undefined) this.snackbarMessage = ''
      this.showSnackbar = !this.showSnackbar
    },
    async clickSeed () {

    },
    async clickTruncate () {

    },
    async showTables () {
      let sequelize = connection
      let query = 'SHOW TABLES'
      let exists = false
      let type = sequelize.QueryTypes.SHOWTABLES
      let options = { type: type, raw: true }
      let tables = await sequelize.query(query, options)
        .catch(error => {
          return []
        })
      return tables
    },
    synchronize (model, action) {
      let sequelize = connection
      return sequelize.transaction(
        transaction => {
          let options = { transaction: transaction }
          return model[action](options)
            .then(value => {
              this.emitLogData()
              return value
            })
            .catch(error => { throw error })
        }
      )
    },
    async synchronizeAll (action) {
      let tables = (action === 'sync') ? this.tables : this.tables.slice().reverse()
      let sequelize = connection
      for (let table of tables) {
        await this.synchronize(table.model, action)
      }
      await this.setTableExists()
      return true
    },
    async fileExists (path) {
      let stat = await new Promise((resolve, reject) => {
        let content = fs.existsSync(path)
        resolve(content)
      })
      return stat
    },
    async readFile (path) {
      let file = await new Promise((resolve, reject) => {
        let content = fs.readFileSync(path, 'utf8')
        resolve(content)
      })
      return JSON.parse(file)
    },
    async recreateAll () {
      let status
      status = await this.synchronizeAll('drop')
      if (status) status = await this.synchronizeAll('sync')
      if (status) this.emitLogData()
    },
    async setTableExists () {
      let existing = await this.showTables()
      for (let target of this.tables) {
        if (find(existing, (item) => { return item === target.name }) !== undefined) target.exists = true
      }
    },
    async setSeedExists () {
      for (let table in this.tables) {

      }
    },
    clickAddRemove (item) {
      let action = item.exists ? 'drop' : 'sync'
      this.synchronize(item.model, action)
        .then((data) => {
          this.emitLogData(data)
          mapValues(this.tables, (target) => {
            if (target === item) target.exists = !item.exists
          })
        })
        .catch(this.emitLogError)
    },
    async populateTables () {
      const {
        Abilities,
        Districts,
        EmployeeAttendances,
        EmployeeContractTypes,
        EmployeeContracts,
        EducationAlmamaters,
        EmployeeLeaveTypes,
        EmployeeLicenseTypes,
        EmployeeLicenses,
        JobTitles,
        Employees,
        Provinces,
        Regencies,
        RoleAbilities,
        Roles,
        Users,
        Villages,
        Tags,
        DocumentTags,
        DocumentVersions,
        Documents,
        ModelInfos
      } = models
      // console.log(models)

      let list = [
        Provinces,
        Regencies,
        Districts,
        Villages,
        JobTitles,
        EducationAlmamaters,
        Employees,
        EmployeeLeaveTypes,
        EmployeeAttendances,
        EmployeeContractTypes,
        EmployeeContracts,
        EmployeeLicenseTypes,
        EmployeeLicenses,
        Abilities,
        Roles,
        RoleAbilities,
        Users,
        Tags,
        DocumentTags,
        Documents,
        DocumentVersions,
        ModelInfos
      ]

      let key = 0
      for (let item of list) {
        let name = item.getTableName()
        this.tables.push({
          key: key++,
          model: item,
          name: name,
          json: __static + '/json/' + name + '.json',
          exists: false
        })
      }
      await this.setTableExists()
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-tabs {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .table-tabs > .md-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
  .table-tabs .md-table {
    flex: 1;
    display: flex;
  }
  .table-tabs .md-table.md-table .md-table-content {
    display: flex;
    max-height: 100%;
  }
  .padding-10 {
    padding: 10px;
  }
</style>

<style>
  .table-tabs .md-table-content {
    display: flex;
    flex: 1;
    overflow-y: scroll !important;
    height: 100% !important;
    max-height: none !important;
  }
</style>
