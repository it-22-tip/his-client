<style>
.regency-picker.md-field .md-input-action.md-clear {
  right: -32px;
}
</style>

<script>
import AreaPicker from './area-picker'
export default {
  name: 'RegencyPicker',
  mixins: [
    AreaPicker
  ],
  data () {
    return {
      classes: 'regency-picker',
      label: 'Kota/Kab',
      modelName: 'Regencies',
      where: 'ProvinceCode'
    }
  }
}
</script>
