<template>
  <sub-page>
    [hello 3]
    <md-field>
      <md-input
        v-model="msg"/>
    </md-field>
    <md-button @click="send">click</md-button>
  </sub-page>
</template>

<script>
import SocketIOCLient from 'socket.io-client'
import SubPage from '@components/SubPage'
const socket = SocketIOCLient('http://localhost:4500')
export default {
  name: 'SubOne',
  components: {
    'sub-page': SubPage
  },
  data () {
    return {
      msg: ''
    }
  },
  mounted () {
    socket.on('chat', (d) => {
      console.log(d)
    })
  },
  methods: {
    send () {
      socket.emit('chat', this.$data.msg)
      console.log('send')
    }
  }
}
</script>
