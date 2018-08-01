<script>
import RegionPicker from './region-picker'
export default {
  name: 'ProvincePicker',
  mixins: [
    RegionPicker
  ],
  data () {
    return {
      classes: 'province-picker',
      label: 'Prov',
      modelName: 'Provinces',
      checkWhere: false
    }
  }
}
</script>
