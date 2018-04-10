<template>
  <md-content class="db">
    <md-content class="db-main">
      <md-toolbar class="md-primary" md-elevation="0">
        <div class="md-toolbar-section-start">
          <md-button @click="onClickBack" class="md-icon-button db-main-button">
            <md-icon>more_vert</md-icon>
          </md-button>
          <h1 class="md-title">Title</h1>
        </div>
      </md-toolbar>
      <md-content class="db-main-tabs">
        <md-tabs @md-changed="clearLog">
          <md-tab id="tab-database" md-label="Data Base" :to="{ name: 'page.install.database'}"/>
          <md-tab id="tab-table" md-label="Table" :to="{ name: 'page.install.table'}"/>
          <md-tab id="tab-image" md-label="Image" :to="{ name: 'page.install.image'}"/>
        </md-tabs>
        <md-content class="db-main-tabs-content md-scrollbar">
          <router-view @log="writeLog"></router-view>
        </md-content>
      </md-content>
    </md-content>
    <log-viewer v-model="log"/>
  </md-content>
</template>

<style lang="scss" scoped>
  .db {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
  }
  .db > .db-main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .db-main > .md-content {
    flex: 1;
  }
  .db-main-tabs {
    display: flex;
    flex-direction: column;
  }
  .db-main-tabs > .md-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .db-main-tabs-content {
    flex: 1;
  }
  .db-main-button {
    color: white;
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
      this.log = []
    },
    components: {
      'log-viewer': () => import('./LogViewer'),
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
    }
  }
</script>
