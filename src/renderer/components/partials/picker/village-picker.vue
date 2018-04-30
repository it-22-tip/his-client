<style>
.village-picker.md-field .md-input-action.md-clear {
  right: -32px;
}
</style>

<script>
import AreaPicker from './area-picker'
export default {
  name: 'VillagePicker',
  mixins: [
    AreaPicker
  ],
  data () {
    return {
      classes: 'village-picker',
      label: 'Kelurahan/Desa',
      modelName: 'Villages'
    }
  }
}
</script>
