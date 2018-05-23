<script>
export default {
  name: 'StepperFin',
  mounted () {
  },
  render: function (createElement) {
    return createElement(
      'MdStep', // tag name
      {
        attrs: {
          ...this.$attrs,
          id: 'finish',
          'md-label': 'Simpan Data'
        }
      },
      [createElement('div', {}, 'ok')]
    )
  }
}
</script>
