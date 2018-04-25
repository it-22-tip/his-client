<template>
  <app-wrapper>
    <page-container>
      <template slot="header">
        <h3
          class="md-title"
          style="flex: 1">IMAP</h3>
        <menu-feature/>
      </template>
      <div
        slot="default"
        class="padding-20">
        <md-field>
          <label>Host</label>
          <md-input v-model="host"/>
        </md-field>
        <md-field>
          <label>User</label>
          <md-input v-model="user"/>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input v-model="password"/>
        </md-field>
        <md-field>
          <label>Port</label>
          <md-input v-model="port"/>
        </md-field>
        <div>
          <md-checkbox v-model="tls">TLS</md-checkbox>
        </div>
        <md-button @click="get1">Get 1</md-button>
        <md-button @click="get2">Get 2</md-button>
        <md-button @click="get3">Get 3</md-button>
        <div>
          {{ viewinbox }}
        </div>
      </div>
      <page-footer slot="footer">
        <div>FOOTER</div>
      </page-footer>
    </page-container>
  </app-wrapper>
</template>

<script>
import ImapClient from 'emailjs-imap-client'
import Imap from 'imap'
import {inspect} from 'util'
import fs from 'fs'

export default {
  data () {
    return {
      host: '',
      password: '',
      port: '993',
      user: '',
      tls: true,
      errors: null,
      inbox: [],
      viewinbox: null
    }
  },
  watch: {
    inbox (value) {
      // console.log(value)
      this.viewinbox = value
    }
  },
  methods: {
    getImap () {
      return new Imap({
        user: this.user,
        password: this.password,
        host: this.host,
        port: this.port,
        tls: true
      })
    },
    get1 () {
      var imap = this.getImap()

      function openInbox (cb) {
        imap.openBox('INBOX', true, cb)
      }

      imap.once('ready', function () {
        openInbox(function (err, box) {
          if (err) throw err
          var f = imap.seq.fetch('1:3', {
            bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
            struct: true
          })
          f.on('message', function (msg, seqno) {
            console.log('Message #%d', seqno)
            var prefix = '(#' + seqno + ') '
            msg.on('body', function (stream, info) {
              var buffer = ''
              stream.on('data', function (chunk) {
                buffer += chunk.toString('utf8')
              })
              stream.once('end', function () {
                console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)))
              })
            })
            msg.once('attributes', function (attrs) {
              console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8))
            })
            msg.once('end', function () {
              console.log(prefix + 'Finished')
            })
          })
          f.once('error', function (err) {
            console.log('Fetch error: ' + err)
          })
          f.once('end', function () {
            console.log('Done fetching all messages!')
            imap.end()
          })
        })
      })

      imap.once('error', function (err) {
        console.log(err)
      })

      imap.once('end', function () {
        console.log('Connection ended')
      })

      imap.connect()
    },
    get2 () {
      var imap = this.getImap()

      function openInbox (cb) {
        imap.openBox('INBOX', true, cb)
      }
      imap.once('ready', function () {
        openInbox(function (err, box) {
          if (err) throw err
          imap.search([ 'UNSEEN', ['SINCE', 'May 20, 2010'] ], function (err, results) {
            if (err) throw err
            var f = imap.fetch(results, { bodies: '' })
            f.on('message', function (msg, seqno) {
              console.log('Message #%d', seqno)
              var prefix = '(#' + seqno + ') '
              msg.on('body', function (stream, info) {
                console.log(prefix + 'Body')
                stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'))
              })
              msg.once('attributes', function (attrs) {
                console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8))
              })
              msg.once('end', function () {
                console.log(prefix + 'Finished')
              })
            })
            f.once('error', function (err) {
              console.log('Fetch error: ' + err)
            })
            f.once('end', function () {
              console.log('Done fetching all messages!')
              imap.end()
            })
          })
        })
      })
    },
    get3 () {
      var client = new ImapClient(this.host, this.port, {
        auth: {
          user: this.user,
          pass: this.password
        }
      })
      client.connect().then(
        () => {
          client.listMessages('INBOX', '1:10', ['uid', 'flags', 'body[]'])
            .then(
              messages => {
                messages.forEach(
                  message => {
                    this.inbox.push(message)
                  }
                )
                client.close().then(
                  () => {
                    console.log('success to close')
                  },
                  error => {
                    this.errors = error
                  }
                )
              },
              error => {
                this.errors = error
              }
            )
        },
        error => {
          this.errors = error
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
  .padding-20 {
    padding: 20px;
  }
</style>
