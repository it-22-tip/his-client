<template>
  <md-content class="install">
    <div class="main">
      <div class="padding-10">
        <md-subheader>Create Data Base</md-subheader>
        <md-field>
          <label>Host</label>
          <md-input v-model="options.common.host"/>
        </md-field>
        <md-field>
          <label>User</label>
          <md-input v-model="options.root.username"/>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input v-model="options.root.password" type="password"/>
        </md-field>
        <md-content>
          <md-button :disabled="progress" @click="runAll" class="md-primary md-raised">All</md-button>
          <md-button :to="{ name: 'base.login' }" class="md-primary md-raised">Login</md-button>
        </md-content>
      </div>
    </div>
    <p v-if="progress">{{ parseInt(percentage / total * 100) }}% {{ message }}</p>
    <div class="progress">
      <md-progress-bar v-if="progress" :md-value="parseInt(percentage / total * 100)" md-mode="determinate"/>
    </div>
  </md-content>
</template>

<script>
  import { default as Promise } from 'bluebird'
  import path from 'path'
  import os from 'os'
  import { map } from 'lodash'
  import bcrypt from 'bcrypt'
  import file from '@/mixins/file'
  import orm from '@/mixins/orm'
  import { reduce, isEmpty, extend } from 'lodash'
  export default {
    mixins: [
      orm,
      file
    ],
    data () {
      return {
        options: {
          root: {
            username: null,
            password: null,
            database: null
          },
          application: {
            username: null,
            password: null,
            database: null
          },
          common: {
            host: null
          }
        },
        seeds: {},
        seedsCount: 0,
        queries: [],
        models: [],
        percentage: 0,
        progress: false,
        dir: '',
        total: 0,
        jsonDir: '',
        mediaDir: '',
        imageDir: '',
        message: '',
        PreQueriesConnection: null,
        ApplicationConnection: null
      }
    },
    created () {
    },
    async beforeDestroy () {
      await this.closeConnection()
    },
    async mounted () {
      await this.closeConnection()
      this.dir = path.join(os.homedir() + `/.hisdata`)
      this.jsonDir = path.join(this.dir, '/json')
      this.mediaDir = path.join(this.dir, '/media')
      this.imageDir = path.join(this.mediaDir, '/jpg')
      await this.readConfig()
      await this.setQueries()
      await this.setSeed()
    },
    methods: {
      async closeConnection () {
        if (this.PreQueriesConnection !== null && typeof this.PreQueriesConnection.close === 'function') {
          try {
            await this.PreQueriesConnection.close()
          } finally {
            console.log('c1')
            this.PreQueriesConnection = null
          }
        }
        if (this.ApplicationConnection !== null && typeof this.ApplicationConnection.close === 'function') {
          try {
            await this.ApplicationConnection.close()
          } finally {
            console.log('c2')
            this.ApplicationConnection = null
          }
        }
        this.message = 'done',
        this.percentage = 0
        this.progress = false
      },
      async setTotal (connection) {
        this.total = this.queries.length +
        this.seedsCount +
        connection.list.length
        return null
      },
      setQueries () {
        const { application, common } = this.options
        let user = `"${application.username}"@"${common.host}"`
        let password = `"${application.password}"`
        let database = `${application.database}`
        let priviledges = 'CREATE, SELECT, UPDATE, INSERT, DROP, ALTER'
        const queries = [
          {
            title: 'Drop Database',
            query: `DROP DATABASE IF EXISTS ${database}`
          },
          {
            title: 'Create Database',
            query: `CREATE DATABASE ${database}`
          },
          {
            title: 'Drop User',
            query: `DROP USER IF EXISTS ${user}`
          },
          {
            title: 'Create User',
            query: `CREATE USER ${user} IDENTIFIED BY ${password}`
          },
          {
            title: 'Grant Priviledge',
            query: `GRANT ${priviledges} ON ${database}.* TO ${user}`
          }
        ]
        this.queries = queries
      },
      async readConfig () {
        let options = {}
        try {
          options = await this.readYAML(this.dir + '/conf.yml')
        } catch (error) {}
        options = extend({}, this.options, options)
        this.options = options
      },
      async runAll () {
        const { root, common, application } = this.options
        this.progress = true
        // this.reset()
        this.PreQueriesConnection = (new this.$orm).withOption(root).connect()
        this.ApplicationConnection = (new this.$orm).withOption(application).connect()
        console.log(this.ApplicationConnection)
        await this.setTotal(this.ApplicationConnection)
        try {
          await this.PreQueries(this.PreQueriesConnection)
          await this.CreateTable(this.ApplicationConnection)
          await this.SeedTable(this.ApplicationConnection)
        } catch (error) {
          console.log({error})
        } finally {
          await this.closeConnection()
        }
      },
      async PreQueries(connection) {
        return connection.transaction(
          async transaction => {
            let options = {
              transaction: transaction,
              type: connection.QueryTypes.RAW,
              raw: true
            }
            if (connection.connectionManager.dialectName === 'sqlite') return null
            for (let query of this.queries) {
              try {
                this.message = 'Running Preinstall: ' + query.title
                await connection.query(query.query, options).delay(600)
                this.percentage++
              } catch (error) {
                throw error
              }
            }
            return null
          }
        )
      },
      async CreateTable (connection) {
        return connection.transaction(
          async transaction => {
            let options = { transaction: transaction }
            for (let model of connection.list) {
              try {
                await model.sync(options)
                this.message = 'Creating Table: ' + model.getTableName()
                this.percentage++
              } catch (error) {
                throw error
              }
            }
          }
        )
      },
      async SeedTable(connection) {
        return connection.transaction(
          async transaction => {
            let options = { transaction: transaction }
            for (let model of connection.list) {
              let current = model.getTableName()
              let seed = (this.seeds)[current]
              if (seed === undefined) continue
              try {
                await model.bulkCreate(seed, options)
                this.message = 'Seeding Table: ' + current
                this.percentage++
              } catch (error) {
                throw error
              }
            }
          }
        )
      },
      async setSeed () {
        let jsonDir = this.jsonDir
        let seeds = {}
        let files = await this.readDir(jsonDir)
        for (let file of files) {
          let modelName = file.split('.')[0]
          let seed = await this.readJSON(path.join(jsonDir, file))
          let seedMethod = 'seed' + modelName
          if (typeof this[seedMethod] === 'function') {
            seed = await this[seedMethod](seed)
          }
          seeds[modelName] = seed
        }
        this.seedsCount = files.length
        this.seeds = seeds
      },
      seedUsers (seed) {
        return Promise.resolve(map(seed, this.givePassword))
      },
      givePassword(User) {
        let Salt = bcrypt.genSaltSync(10)
        User.PassKey = bcrypt.hashSync(User.PassKey, Salt)
        User.Salt = Salt
        return User
      },
      async seedPersons (seed) {
        for (let person of seed) {
          let image = person.Id + '.jpg'
          image = path.join(this.imageDir, image)
          try {
            image = await this.readFile(image)
          } catch (error) {
            continue
          }
          person.Avatar = image
        }
        return Promise.resolve(seed)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .install {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .install .main {
    flex: 1;
  }
  .padding-10 {
    padding: 10px;
  }
  .progress {
    height: 5px;
    width: 100%;
  }
</style>
