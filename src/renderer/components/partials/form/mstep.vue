<script>
export default {
  render: function (createElement) {
    return createElement(
      'MdStep', // tag name
      {
        attrs: {
          ...this.$attrs
        }
      },
      this.$slots.default
    )
  }
}
</script>
