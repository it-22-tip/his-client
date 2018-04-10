<template>
  <md-content class="db-tabs">
    <div class="padding-10">
      <md-subheader>Create Data Base</md-subheader>
      <md-field>
        <label>Host</label>
        <md-input v-model="host"/>
      </md-field>
      <md-field>
        <label>User</label>
        <md-input v-model="username"/>
      </md-field>
      <md-field>
        <label>Password</label>
        <md-input v-model="password" type="password"/>
      </md-field>
      <md-content>
        <md-button @click="create" class="md-primary md-raised">Create</md-button>
        <md-button @click="drop" class="md-primary md-raised">Drop</md-button>
      </md-content>
    </div>
  </md-content>
</template>

<script>
  import Sequelize from 'sequelize'
  export default {
    data () {
      return {
        host: 'localhost',
        username: 'root',
        password: '',
        dialect: 'mysql'
      }
    },
    methods: {
      emitLogData (data) {
        this.$emit('log', {message: 'success', type: 'success'})
      },
      emitLogError (error) {
        console.log(error)
        // this.$emit('log', {message: error.original.message, type: 'error'})
      },
      getConnection () {
        const sequelize = new Sequelize(
          {
            password: this.password,
            username: this.username,
            host: this.host,
            dialect: this.dialect
          }
        )
        return sequelize
      },
      drop_or_create(query) {
        let sequelize = this.getConnection()
          sequelize.transaction(
            transaction => {
              let options = {
                transaction: transaction,
                type: sequelize.QueryTypes.RAW,
                raw: true
              }
              return sequelize.query(query, options)
                .then(value => {
                  return value
                })
                .catch(error => { throw error })
            }
          )
            .then(this.emitLogData)
            .catch(this.emitLogError)
      },
      create () {
        let query = `CREATE database simrs`
        this.drop_or_create(query)
      },
      drop () {
        let query = `DROP database simrs`
        this.drop_or_create(query)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .db-tabs {
    flex: 1;
  }
  .padding-10 {
    padding: 10px;
  }
</style>
