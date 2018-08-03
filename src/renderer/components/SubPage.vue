<template>
  <div class="sub-page">
    <div>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubPage'
}
</script>

<style lang="scss" scoped>
  .sub-page {
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    background: grey;
  }
  .sub-page > div {
    display: block;
    height: 100%;
    background: white;
    position: relative;
  }
</style>
