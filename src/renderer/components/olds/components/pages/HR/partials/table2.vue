<template>
    <md-table class="hr-table" v-model="people" @md-selected="onSelect" md-sort="NO" md-sort-order="asc" md-fixed-header>
      <md-table-toolbar>
        <h1 class="md-TANGGAL_LAHIR">With auto select and alternate headers</h1>
      </md-table-toolbar>

      <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" :md-disabled="item.NAMA.includes('Stave')" md-selectable="multiple" md-auto-select>
        <md-table-cell md-label="NO" md-sort-by="NO" md-numeric>{{ item.NO }}</md-table-cell>
        <md-table-cell md-label="NAMA" md-sort-by="NAMA">{{ item.NAMA }}</md-table-cell>
        <md-table-cell md-label="STATUS_PERNIKAHAN" md-sort-by="STATUS_PERNIKAHAN">{{ item.STATUS_PERNIKAHAN }}</md-table-cell>
        <md-table-cell md-label="GENDER" md-sort-by="GENDER">{{ item.GENDER }}</md-table-cell>
        <md-table-cell md-label="TANGGAL_LAHIR" md-sort-by="TANGGAL_LAHIR">{{ item.TANGGAL_LAHIR }}</md-table-cell>
      </md-table-row>
      <md-table-toolbar>
        <h1 class="md-TANGGAL_LAHIR">With auto select and alternate headers</h1>
      </md-table-toolbar>
    </md-table>
</template>

<script>
  export default {
    NAMA: 'TableMultiple',
    created () {
      let fs = require('fs')
      const readFile = async () => {
        await fs.readFile(__static + '/employee.json', 'utf-8', (error, result) => {
          if (error) {
            throw error
          }
          result = JSON.parse(result)
          console.log(result)
          this.people = Object.values(result)
        })
      }
      readFile()
      // this.searched = this.users
    },
    data: () => ({
      selected: [],
      people: []
    }),
    methods: {
      onSelect (items) {
        this.selected = items
      },
      getAlternateLabel (count) {
        let plural = ''

        if (count > 1) {
          plural = 's'
        }

        return `${count} user${plural} selected`
      }
    }
  }
</script>

<style lang="scss">
  .hr-table {
    height: 100%;
    display: flex;
  }
  .hr-table .md-table-content {
    flex: 1;
    overflow: hidden;
  }
</style>


<style lang="scss" scoped>

</style>
