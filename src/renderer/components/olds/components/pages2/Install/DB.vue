<template>
  <md-content class="db">
  <md-content class="db-main">
    <md-toolbar class="md-primary" md-elevation="0">
      <div class="md-toolbar-section-start">
        <md-button @click="onClickBack" class="md-icon-button">
          <md-icon>more_vert</md-icon>
        </md-button>
      </div>
    </md-toolbar>
    <md-content>
      <md-tabs @md-changed="clearLog">
        <md-tab id="tab-database" md-label="Data Base">
          <database-tab @log="writeLog"/>
        </md-tab>
        <md-tab id="tab-table" md-label="Table">
          <table-tab @log="writeLog"/>
        </md-tab>
        <md-tab id="tab-seed" md-label="Seed">
          <seed-tab @log="writeLog"/>
        </md-tab>
      </md-tabs>
    </md-content>
  </md-content>
  <log-viewer v-model="log"/>
  </md-content>
</template>

<style lang="scss">
  .db {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
  }
  .db > .db-main {
    flex: 2;
    display: flex;
    flex-direction: column;
  }
  .db-main > .md-content {
    flex: 1;
  }
  .db-main > .md-content .md-tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .db-main > .md-content .md-tabs .md-content {
    flex: 1;
  }
  .db > .db-log {
    flex: 1;
  }
  .db-main-button {
    background-color: white;
    color: black;
  }
</style>

<script>
  import moment from 'moment'
  import fs from 'fs'
  export default {
    name: 'InstallDB',
    data () {
      return {
        log: [],
        db: [],
        rootName: '',
        rootPassword: ''
      }
    },
    mounted () {
    },
    methods: {
      clearLog() {
        this.log = []
      },
      writeLog ($event) {
        let key
        if (this.log === undefined) {
          this.log = []
          key = 0
        } else {
          key = this.log.length
        }
        this.log.push({ message: $event.message, key: key, type: $event.type})
      },
      mountDB (model) {
        let name = model.getTableName()
        this.db.push(
          {
            model: model,
            name: name,
            json: __static + '/json/' + name + '.json'
          }
        )
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
      async dropTable (model) {
        let name = model.getTableName()
        await model
          .drop()
          .then(() => {
            this.log.push({time: moment(), message: 'database ' + name + ' has been dropped'})
          })
      },
      async createTable (model) {
        let name = model.getTableName()
        this.log.push({time: moment(), message: 'creating database ' + name})
        await model
          .sync()
          .then(() => {
            this.log.push({time: moment(), message: 'database ' + name + ' has been created'})
          })
      },
      async bulkInsert (json, model, name) {
        let exist = await this.fileExists(json)
        if (!exist) {
          this.log.push({time: moment(), message: 'file ' + json +' doesnt exists'})
          return
        }

        let data = await this.readFile(json)
        await model.bulkCreate(data).then(
          () => {
            this.log.push({time: moment(), message: 'database ' + name + ' has been seeded'})
          }
        )
      },
      async bulkInsertEmployee (json, model, name) {
        let data = await this.readFile(json)
        await model.bulkCreate(data).then(
          () => {
            this.log.push({time: moment(), message: 'database ' + name + ' has been seeded'})
          }
        )
      },
      async processCreate () {
        let drop = await this.processDrop()
        for (let process of this.db) {
          await this.createTable(process.model)
        }
      },
      async processDrop () {
        let db = this.db.reverse()
        for (let process of db) {
          await this.dropTable(process.model)
        }
      },
      async processInsert () {
        for (let process of this.db) {
          if (process.name !== 'employees') {
            await this.bulkInsert(process.json, process.model, process.name)
          } else {
            await this.bulkInsertEmployee(process.json, process.model, process.name)
          }
        }
      },
      onClickBack () {
        this.$router.push({ name: 'page.base.login' })
      },
      onClickDrop () {
        this.log = []
        this.processDrop()
      },
      onClickCreate () {
        this.log = []
        this.processCreate()
      },
      onClickInsert () {
        this.log = []
        this.processInsert()
      }
    },
    components: {
      'alter-tab': () => import('./partials/AlterTab'),
      'database-tab': () => import('./partials/DatabaseTab'),
      'log-viewer': () => import('./partials/LogViewer'),
      'seed-tab': () => import('./partials/SeedTab'),
      'table-tab': () => import('./partials/TableTab')
    }
  }
</script>
