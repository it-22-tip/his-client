<script>
export default {
  render: function (createElement) {
    return createElement(
      'MdSteppers', // tag name
      {
        attrs: this.$attrs
      },
      this.$slots.default
    )
  }
}
</script>
