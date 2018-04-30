<style>
.province-picker.md-field .md-input-action.md-clear {
  right: -32px;
}
</style>

<script>
import AreaPicker from './area-picker'
export default {
  name: 'ProvincePicker',
  mixins: [
    AreaPicker
  ],
  data () {
    return {
      classes: 'province-picker',
      label: 'Prov',
      modelName: 'Provinces',
      checkWhere: false,
      disabled: false
    }
  }
}
</script>
