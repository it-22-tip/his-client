<template>
  <app-wrapper>
    <page-container>
      <template slot="header">
        <h3
          class="md-title"
          style="flex: 1">MySql</h3>
        <menu-feature/>
      </template>
      <div
        slot="default"
        class="padding-20">
        <image-cropper/>
        <div>{{ files }}</div>
        <div v-if="displayImage">
          <img
            :src="displayImage"
            height="20"
            width="20">
        </div>
        <div>
          <md-button @click="clickCreate">Create</md-button>
          <md-button @click="clickDrop">Drop</md-button>
          <md-button @click="clickInsert">Insert</md-button>
          <md-button @click="clickGet">Get</md-button>
        </div>
        <md-snackbar
          :md-position="`center`"
          :md-duration="Infinity"
          :md-active.sync="connectionSuccessMessage"
          md-persistent>
          <span>{{ snackbar }}</span>
        </md-snackbar>
      </div>
      <page-footer slot="footer">
        <div>FOOTER</div>
      </page-footer>
    </page-container>
  </app-wrapper>
</template>

<script>
import Sequelize from 'sequelize'
import mysql from 'mysql2/promise'
export default {
  data () {
    return {
      files: [],
      host: 'localhost',
      user: 'root',
      password: '',
      db: '',
      connectionSuccessMessage: false,
      snackbar: '',
      connection: null,
      displayImage: null
    }
  },
  mounted () {
  },
  methods: {
    inputFile (newFile, oldFile) {
      /* if (newFile && oldFile && !newFile.active && oldFile.active) {
          // Get response data
          console.log('response', newFile.response)
          if (newFile.xhr) {
            //  Get the response status code
            console.log('status', newFile.xhr.status)
          }
        } */
    },
    inputFilter (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Filter non-image file
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          console.log('not image')
          return prevent()
        }
      }

      // Create a blob field
      newFile.blob = ''
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    },
    async connect () {
      let string
      let connection
      try {
        string = await import(__static + '/config/db.json').then(val => { return val })
      } catch (error) {
        console.log({'no config error': error})
      }
      try {
        connection = await mysql.createConnection(string)
        console.log(connection.connection)
        return connection
      } catch (error) {
        console.log({'config error': error})
      }
    },
    clickGet () {
      this.run('SELECT * FROM files WHERE id = ? LIMIT 1;', [1]).then(
        val => {
          let blob = new Blob([val[0][0].data], { type: 'image/png' })
          var reader = new FileReader()
          reader.addEventListener('loadend', () => {
            this.displayImage = reader.result
          })
          reader.readAsDataURL(blob)
        }
      )
    },
    clickCreate () {
      let sql = `
        CREATE TABLE
        files (
        id    INT           AUTO_INCREMENT,
        mime  VARCHAR (255) NOT NULL,
        data  LONGBLOB          NOT NULL,
        PRIMARY KEY (id)
        )
        ENGINE = InnoDB
        DEFAULT CHARACTER SET = utf8mb4
        DEFAULT COLLATE = utf8mb4_unicode_ci
        ;
        `
      this.run(sql, null).then(
        val => {
          console.log(val)
        }
      )
    },
    clickDrop () {
      let sql = `
        DROP TABLE files;
        `
      this.run(sql, null).then(
        val => {
          console.log(val)
        }
      )
    },
    clickInsert () {
      let fs = require('fs')
      fs.readFile(__static + '/icon.png', (error, result) => {
        if (error) console.log('read Error')
        this.run('INSERT INTO files SET ?;', { id: 1, mime: 'image/png', data: result }).then(
          val => {
            console.log(val)
          }
        )
      })
    },
    async run (sql, value) {
      try {
        const connection = await this.connect()
        const query = await connection.query(sql, value)
        const end = await connection.end()
        return query
      } catch (error) {
        console.log({'query error: ': error})
      }
    },
    message (msg) {
      this.snackbar = msg
      if (this.connectionSuccessMessage !== true) {
        this.connectionSuccessMessage = true
        setTimeout(
          () => {
            this.connectionSuccessMessage = false
            this.snackbar = ''
          },
          3000
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .padding-20 {
    padding: 20px;
    height: 2000px;
  }
</style>
