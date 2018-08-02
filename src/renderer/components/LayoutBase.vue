<template>
  <div>
    <router-view
      class="full-page"/>
    <router-view
      class="top-panel"
      name="top-panel"/>
    <router-view
      class="side-panel"
      name="side-panel"/>
    <router-view
      class="content"
      name="content"/>
  </div>
</template>

<script>
export default {
  name: 'LayoutBase'
}
</script>
