<template>
  <app-wrapper>
    <page-container>
      <template slot="header">
      <h3 class="md-title" style="flex: 1">Title</h3>
       <menu-feature></menu-feature>
      </template>
      <md-drawer class="md-right" :md-active.sync="drawOpen">
        <md-content :style="{ padding: '20px' }">

        <md-list>
          <md-subheader>Masa Kerja (Tahun)</md-subheader>
          <md-list-item>
              <md-field>
                <label>Dari</label>
                <md-input v-model="regular"></md-input>
              </md-field>
          </md-list-item>
          <md-list-item>
              <md-field>
                <label>Sampai</label>
                <md-input v-model="regular"></md-input>
              </md-field>
          </md-list-item>

          <md-list-item>
            <md-checkbox v-model="notification" value="sound" />
            <span class="md-list-item-text">Pegawai Tetap</span>
          </md-list-item>

          <md-list-item>
            <md-checkbox v-model="notification" value="vibrate" />
            <span class="md-list-item-text">Pegawai Tidak Tetap</span>
          </md-list-item>

        </md-list>
        </md-content>
      </md-drawer>
      <hr-table @filter="open" slot="default"></hr-table>
      <page-footer slot="footer">
        <div>FOOTER</div>
      </page-footer>
    </page-container>
  </app-wrapper>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee'

  export default {
    data () {
      return {
        drawOpen: false,
        regular: '',
        notification: ['sound', 'vibrate']
      }
    },
    components: {
      'hr-table': () => import('./partials/table'),
      FontAwesomeIcon
    },
    computed: {
      icon () {
        return faCoffee
      }
    },
    mounted () {
    },
    methods: {
      open () {
        this.drawOpen = !this.drawOpen
      }
    }
  }
</script>
