<template>
  <div
    ref="contextMenu"
    :id="id"
    :style="ctxStyle"
    class="ctx-menu-container"
    @click.stop
    @contextmenu.stop>
    <div
      style="background-color:transparent"
      class="ctx open">
      <ul
        :class="{
          'ctx-menu-right': align==='right',
          'ctx-menu-left': align==='left'
        }"
        role="menu"
        class="ctx-menu">
        <slot/>
      </ul>
    </div>
  </div>
</template>
<script src="./ctx-menu.js"></script>
<style src="./ctx-menu.css"></style>
