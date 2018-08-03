<template>
  <md-content class="side-panel">
    <md-toolbar md-elevation="0">[My App Title]</md-toolbar>
    <div class="side-panel-menu">
      <md-list>
        <md-list-item>
          <md-icon>move_to_inbox</md-icon>
          <span class="md-list-item-text">Inbox</span>
        </md-list-item>

        <md-list-item @click="$router.push({ name: 'subone' })">
          <md-icon>send</md-icon>
          <span class="md-list-item-text">Sent Mail</span>
        </md-list-item>

        <md-list-item @click="$router.push({ name: 'subtwo' })">
          <md-icon>delete</md-icon>
          <span class="md-list-item-text">Trash</span>
        </md-list-item>

        <md-list-item @click="$router.push({ name: 'subthree' })">
          <md-icon>error</md-icon>
          <span class="md-list-item-text">Spam</span>
        </md-list-item>
      </md-list>
    </div>
    <md-toolbar md-elevation="0">
      <md-button
        class="md-icon-button"
        @click="$router.push({ name: 'subone' })">
        <md-icon>refresh</md-icon>
      </md-button> Minimize
    </md-toolbar>
  </md-content>
</template>

<script>
export default {
  name: 'SidePanel'
}
</script>

<style lang="scss" scoped>
  .side-panel {
    display: flex;
    flex-direction: column;
  }
  .side-panel-menu {
    flex: 1;
  }
</style>
