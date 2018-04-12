<template>
  <md-content>
    <button @click="LogOut">Log Out</button>
    <button @click="Dashboard">Dashboard</button>
    <button @click="Employees">Employees</button>
    <button @click="Licenses">Licenses</button>
    <button @click="JobTitles">Job Titles</button>
    <button @click="Documents">Documents</button>
    <button @click="Icons">Icons</button>
    <button @click="Tabs">Tabs</button>
  </md-content>
</template>

<script>
  export default {
    methods: {
      LogOut () {
        this.$router.push({ name: 'base.login' })
      },
      Dashboard () {
        this.$router.push({ name: 'base.dashboard' })
      },
      Employees () {
        this.$router.push({ name: 'employees.employee.list' })
      },
      Licenses () {
        this.$router.push({ name: 'employees.license.list' })
      },
      JobTitles () {
        this.$router.push({ name: 'employees.jobtitle.list' })
      },
      Documents () {
        this.$router.push({ name: 'documents.document.list' })
      },
      Icons () {
        this.$router.push({ name: 'example.icons' })
      },
      Tabs () {
        this.$router.push({ name: 'example.tabs' })
      }
    }
  }
</script>

