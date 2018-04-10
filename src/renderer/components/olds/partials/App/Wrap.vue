<template>
  <div>
    <md-menu md-direction="bottom-start">
      <md-button class="md-accent md-dense md-raised" md-menu-trigger>
        Base
      </md-button>

      <md-menu-content>
        <md-menu-item :to="{ name: 'page.base.login' }">Login</md-menu-item>
        <md-menu-item :to="{ name: 'page.base.dashboard' }">Dashboard</md-menu-item>
      </md-menu-content>
    </md-menu>
    <md-menu md-direction="bottom-start">
      <md-button class="md-accent md-dense md-raised" md-menu-trigger>
        Fitur
      </md-button>

      <md-menu-content>
        <md-menu-item :to="{ name: 'page.feature.markdown' }">Markdown</md-menu-item>
        <md-menu-item :to="{ name: 'page.feature.qr' }">QR</md-menu-item>
        <md-menu-item :to="{ name: 'page.feature.barcode' }">Barcode</md-menu-item>
        <md-menu-item :to="{ name: 'page.feature.table' }">Table</md-menu-item>
        <md-menu-item :to="{ name: 'page.feature.pdf' }">PDF</md-menu-item>
      </md-menu-content>
    </md-menu>
  </div>
</template>

<script>
  export default {

  }
</script>

