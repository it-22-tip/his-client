<template>
  <md-content class="table-tabs">
    <md-content>
      [cnt]
    </md-content>
  </md-content>
</template>

<script>
export default {
}
</script>


<style lang="scss" scoped>
  .table-tabs {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .table-tabs > .md-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
  .table-tabs .md-table {
    flex: 1;
    display: flex;
  }
  .table-tabs .md-table.md-table .md-table-content {
    display: flex;
    max-height: 100%;
  }
  .padding-10 {
    padding: 10px;
  }
</style>

<style>
  .table-tabs .md-table-content {
    display: flex;
    flex: 1;
    overflow-y: scroll !important;
    height: 100% !important;
    max-height: none !important;
  }
</style>
