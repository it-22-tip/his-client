<script>
export default {
  mounted () {
  },
  render: function (createElement) {
    return createElement(
      'MdStep', // tag name
      {
        attrs: {
          ...this.$attrs,
          id: 'ok',
          'md-label': 'find'
        }
      },
      [createElement('div', {}, 'ok')]
    )
  }
}
</script>
