<script>
import RegionPicker from './region-picker'
export default {
  name: 'VillagePicker',
  mixins: [
    RegionPicker
  ],
  data () {
    return {
      classes: 'village-picker',
      label: 'Kelurahan/Desa',
      modelName: 'Villages',
      where: 'DistrictCode'
    }
  }
}
</script>
