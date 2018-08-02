<template>
  <md-toolbar>
    <md-button
      class="md-primary md-raised"
      @click="$router.push({ name: 'login' })">
      Logout
    </md-button>
    <md-button
      class="md-primary md-raised"
      @click="$router.push({ name: 'subone' })">
      Sub One
    </md-button>
    <md-button
      class="md-primary md-raised"
      @click="$router.push({ name: 'subtwo' })">
      Sub Two
    </md-button>
  </md-toolbar>
</template>
