<template>
  <div>
    <ul :class="containerClass" v-if="!noLiSurround">
      <li v-if="firstLastButton" :class="[pageClass, firstPageSelected() ? disabledClass : '']">
        <a @click="selectFirstPage()" @keyup.enter="selectFirstPage()" :class="pageLinkClass">{{ firstButtonText }}</a>
      </li>

      <li v-if="!(firstPageSelected() && hidePrevNext)" :class="[prevClass, firstPageSelected() ? disabledClass : '']">
        <a @click="prevPage()" @keyup.enter="prevPage()" :class="prevLinkClass" tabindex="0"><slot name="prevContent">{{ prevText }}</slot></a>
      </li>

      <li v-for="page in pages" :class="[pageClass, page.selected ? activeClass : '', page.disabled ? disabledClass : '', page.breakView ? breakViewClass: '']">
        <a v-if="page.breakView" :class="[pageLinkClass, breakViewLinkClass]" tabindex="0"><slot name="breakViewContent">{{ breakViewText }}</slot></a>
        <a v-else-if="page.disabled" :class="pageLinkClass" tabindex="0">{{ page.content }}</a>
        <a v-else @click="handlePageSelected(page.index)" @keyup.enter="handlePageSelected(page.index)" :class="pageLinkClass" tabindex="0">{{ page.content }}</a>
      </li>

      <li v-if="!(lastPageSelected() && hidePrevNext)" :class="[nextClass, lastPageSelected() ? disabledClass : '']">
        <a @click="nextPage()" @keyup.enter="nextPage()" :class="nextLinkClass" tabindex="0"><slot name="nextContent">{{ nextText }}</slot></a>
      </li>

      <li v-if="firstLastButton" :class="[pageClass, lastPageSelected() ? disabledClass : '']">
        <a @click="selectLastPage()" @keyup.enter="selectLastPage()" :class="pageLinkClass">{{ lastButtonText }}</a>
      </li>
    </ul>

    <div :class="containerClass" v-else>
      <a v-if="firstLastButton" @click="selectFirstPage()" @keyup.enter="selectFirstPage()" :class="[pageLinkClass, firstPageSelected() ? disabledClass : '']" tabindex="0">{{ firstButtonText }}</a>
      <a v-if="!(firstPageSelected() && hidePrevNext)" @click="prevPage()" @keyup.enter="prevPage()" :class="[prevLinkClass, firstPageSelected() ? disabledClass : '']" tabindex="0"><slot name="prevContent">{{ prevText }}</slot></a>
      <template v-for="page in pages">
        <a v-if="page.breakView" :class="[pageLinkClass, breakViewLinkClass, page.disabled ? disabledClass : '']" tabindex="0"><slot name="breakViewContent">{{ breakViewText }}</slot></a>
        <a v-else-if="page.disabled" :class="[pageLinkClass, page.selected ? activeClass : '', disabledClass]" tabindex="0">{{ page.content }}</a>
        <a v-else @click="handlePageSelected(page.index)" @keyup.enter="handlePageSelected(page.index)" :class="[pageLinkClass, page.selected ? activeClass : '']" tabindex="0">{{ page.content }}</a>
      </template>
      <a v-if="!(lastPageSelected() && hidePrevNext)" @click="nextPage()" @keyup.enter="nextPage()" :class="[nextLinkClass, lastPageSelected() ? disabledClass : '']" tabindex="0"><slot name="nextContent">{{ nextText }}</slot></a>
      <a v-if="firstLastButton" @click="selectLastPage()" @keyup.enter="selectLastPage()" :class="[pageLinkClass, lastPageSelected() ? disabledClass : '']" tabindex="0">{{ lastButtonText }}</a>
    </div>
  </div>
</template>

<script>

</script>

<style lang="css" scoped>
a {
  cursor: pointer;
}
</style>
