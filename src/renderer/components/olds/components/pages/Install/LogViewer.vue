<template>
  <div class="db-log" :class="toggle ? 'db-log-open' : 'db-log-closed'">
    <div class="db-log-toggle" @click="clickToggle">
      <md-icon class="toggle-icon">more_vert</md-icon>
    </div>
    <md-content class="db-log-main">
      <md-toolbar class="md-accent" md-elevation="0">
        <h3 class="md-title" style="flex: 1">Log</h3>
        <md-button @click="clear" class="md-icon-button">
          <md-icon>delete</md-icon>
        </md-button>
      </md-toolbar>
      <md-content class="md-scrollbar">
        <md-subheader>Logs</md-subheader>
        <div style="padding: 10px;">
        <p v-for="(log) in value" :key="log.key" :class="log.type">{{ log.message }}</p>
        </div>
      </md-content>
    </md-content>
  </div>
</template>

<style lang="scss" scoped>
  .db-log {
    display: flex;
    overflow: hidden;
  }
  .db-log-open {
    width: 300px;
  }
  .db-log-closed {
    width: 20px;
  }
  .db-log-toggle {
    width: 20px;
    height: 100%;
    position: relative;
    background: rgba(117, 117, 117, 0.5) !important;
  }
  .toggle-icon {
    color: white;
    position: absolute;
    top: 50%;
  }
  .db-log-closed .db-log-main {
    width: 0;
  }
  .db-log-main {
    flex: 1;
  }
  p.error {
    color: red;
  }
  p.success {
    color: green;
  }
</style>

<script>
  export default {
    props: ['value'],
    data () {
      return {
        messages: [],
        toggle: false
      }
    },
    watch: {},
    methods: {
      clear () {
        this.$emit('input')
      },
      clickToggle () {
        this.toggle = !this.toggle
      }
    }
  }
</script>

