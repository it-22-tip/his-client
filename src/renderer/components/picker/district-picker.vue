<script>
import RegionPicker from './region-picker'
export default {
  name: 'DistrictPicker',
  mixins: [
    RegionPicker
  ],
  data () {
    return {
      classes: 'district-picker',
      label: 'Kecamatan',
      modelName: 'Districts',
      where: 'RegencyCode'
    }
  }
}
</script>
