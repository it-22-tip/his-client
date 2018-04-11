import tunnelSSH from 'tunnel-ssh'

export default {
  created () {
    this.$tunnel = tunnelSSH
  }
}
