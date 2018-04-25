<template>
  <app-wrapper>
    <page-container>
      <template slot="header">
        <h3
          class="md-title"
          style="flex: 1">Title</h3>
        <menu-feature/>
      </template>
      <div
        slot="default"
        class="test"/>
      <page-footer slot="footer">
        <div>FOOTER</div>
      </page-footer>
    </page-container>
  </app-wrapper>
</template>
