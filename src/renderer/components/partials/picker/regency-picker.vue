<script>
import RegionPicker from './region-picker'
export default {
  name: 'RegencyPicker',
  mixins: [
    RegionPicker
  ],
  data () {
    return {
      classes: 'regency-picker',
      label: 'Kota/Kab',
      modelName: 'Regencies',
      where: 'ProvinceCode'
    }
  },
  watch: {
    ProvinceCode: {
      handler: function (x) {
        console.log(x)
      }
    }
  }
}
</script>
