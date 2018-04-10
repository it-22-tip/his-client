<template>
  <app-wrapper>
    <page-container>
      <template slot="header">
      <h3 class="md-title" style="flex: 1">Title</h3>
       <menu-feature></menu-feature>
      </template>
      <div slot="default" class="padding-20">
        <md-field>
          <label>Ketik Di Sini</label>
          <md-input v-model="barcodetext"></md-input>
        </md-field>
        <extra-barcode class="barcode" :value="barcodetext" :format="barcodeformat"></extra-barcode>
      </div>
      <page-footer slot="footer">
        <div>FOOTER</div>
      </page-footer>
    </page-container>
  </app-wrapper>
</template>

<script>
  export default {
    data () {
      return {
        barcodetext: '',
        barcodeformat: 'CODE128'
      }
    },
    methods: {

    }
  }
</script>


<style lang="scss" scoped>
  .padding-20 {
    padding: 20px;
    height: 2000px;
  }
  .barcode {
    height: 100px;
    width: 200px;
  }
</style>
