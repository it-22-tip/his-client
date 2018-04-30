<style>
.district-picker.md-field .md-input-action.md-clear {
  right: -32px;
}
</style>

<script>
import AreaPicker from './area-picker'
export default {
  name: 'DistrictPicker',
  mixins: [
    AreaPicker
  ],
  data () {
    return {
      classes: 'district-picker',
      label: 'Kecamatan',
      modelName: 'Districts'
    }
  }
}
</script>
