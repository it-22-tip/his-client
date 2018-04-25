<template>
  <div class="menu">
    <md-menu md-align-trigger>
      <md-button
        class="md-icon-button"
        md-menu-trigger>
        <md-icon>face</md-icon>
      </md-button>
      <md-menu-content>
        <md-menu-item :to="{ name: 'page.hr.employee.list' }"><span>Daftar</span></md-menu-item>
        <md-menu-item :to="{ name: 'page.hr.license.list' }"><span>Lisensi</span></md-menu-item>
        <md-menu-item :to="{ name: 'page.hr.contract.list' }"><span>Kontrak</span></md-menu-item>
      </md-menu-content>
    </md-menu>

    <md-menu md-align-trigger>
      <md-button
        class="md-icon-button"
        md-menu-trigger>
        <md-icon>description</md-icon>
      </md-button>
      <md-menu-content>
        <md-menu-item :to="{ name: 'page.hr.employee.list' }"><span>Daftar</span></md-menu-item>
        <md-menu-item :to="{ name: 'page.hr.license.list' }"><span>Lisensi</span></md-menu-item>
        <md-menu-item :to="{ name: 'page.hr.contract.list' }"><span>Kontrak</span></md-menu-item>
      </md-menu-content>
    </md-menu>

    <md-menu
      md-align-trigger
      md-direction="bottom-start">
      <md-button
        class="md-icon-button"
        md-menu-trigger>
        <md-icon>menu</md-icon>
      </md-button>
      <md-menu-content>
        <div class="author-card">
          <img
            src="static/jpg/employee/300x400/4.jpg"
            alt="Name">
          <div class="author-card-info">
            <span>Name</span>
          </div>
        </div>
        <md-menu-item :to="{ name: 'page.base.settings' }"><md-icon>settings</md-icon><span>Settings</span></md-menu-item>
        <md-menu-item :to="{ name: 'page.base.dashboard' }"><md-icon/><span>Dashboard</span></md-menu-item>
        <md-menu-item :to="{ name: 'page.base.login' }"><md-icon/><span>Logout</span></md-menu-item>
      </md-menu-content>
    </md-menu>
  </div>
</template>

<script>
import { remote } from 'electron'
export default {
  methods: {
    minimizeToTray () {
      remote.getCurrentWindow().minimize()
    },
    minimize () {

    },
    maximize () {

    },
    fullscreen () {

    }
  }

}
</script>

<style lang="scss" scoped>
  .menu {
    z-index: 100;
  }
</style>
