<template>
  <div>
    <ul
      v-if="!noLiSurround"
      :class="containerClass">
      <li
        v-if="firstLastButton"
        :class="[pageClass, firstPageSelected() ? disabledClass : '']">
        <a
          :class="pageLinkClass"
          @click="selectFirstPage()"
          @keyup.enter="selectFirstPage()">{{ firstButtonText }}</a>
      </li>

      <li
        v-if="!(firstPageSelected() && hidePrevNext)"
        :class="[prevClass, firstPageSelected() ? disabledClass : '']">
        <a
          :class="prevLinkClass"
          tabindex="0"
          @click="prevPage()"
          @keyup.enter="prevPage()"><slot name="prevContent">{{ prevText }}</slot></a>
      </li>

      <li
        v-for="page in pages"
        :class="[pageClass, page.selected ? activeClass : '', page.disabled ? disabledClass : '', page.breakView ? breakViewClass: '']">
        <a
          v-if="page.breakView"
          :class="[pageLinkClass, breakViewLinkClass]"
          tabindex="0"><slot name="breakViewContent">{{ breakViewText }}</slot></a>
        <a
          v-else-if="page.disabled"
          :class="pageLinkClass"
          tabindex="0">{{ page.content }}</a>
        <a
          v-else
          :class="pageLinkClass"
          tabindex="0"
          @click="handlePageSelected(page.index)"
          @keyup.enter="handlePageSelected(page.index)">{{ page.content }}</a>
      </li>

      <li
        v-if="!(lastPageSelected() && hidePrevNext)"
        :class="[nextClass, lastPageSelected() ? disabledClass : '']">
        <a
          :class="nextLinkClass"
          tabindex="0"
          @click="nextPage()"
          @keyup.enter="nextPage()"><slot name="nextContent">{{ nextText }}</slot></a>
      </li>

      <li
        v-if="firstLastButton"
        :class="[pageClass, lastPageSelected() ? disabledClass : '']">
        <a
          :class="pageLinkClass"
          @click="selectLastPage()"
          @keyup.enter="selectLastPage()">{{ lastButtonText }}</a>
      </li>
    </ul>

    <div
      v-else
      :class="containerClass">
      <a
        v-if="firstLastButton"
        :class="[pageLinkClass, firstPageSelected() ? disabledClass : '']"
        tabindex="0"
        @click="selectFirstPage()"
        @keyup.enter="selectFirstPage()">{{ firstButtonText }}</a>
      <a
        v-if="!(firstPageSelected() && hidePrevNext)"
        :class="[prevLinkClass, firstPageSelected() ? disabledClass : '']"
        tabindex="0"
        @click="prevPage()"
        @keyup.enter="prevPage()"><slot name="prevContent">{{ prevText }}</slot></a>
      <template v-for="page in pages">
        <a
          v-if="page.breakView"
          :class="[pageLinkClass, breakViewLinkClass, page.disabled ? disabledClass : '']"
          tabindex="0"><slot name="breakViewContent">{{ breakViewText }}</slot></a>
        <a
          v-else-if="page.disabled"
          :class="[pageLinkClass, page.selected ? activeClass : '', disabledClass]"
          tabindex="0">{{ page.content }}</a>
        <a
          v-else
          :class="[pageLinkClass, page.selected ? activeClass : '']"
          tabindex="0"
          @click="handlePageSelected(page.index)"
          @keyup.enter="handlePageSelected(page.index)">{{ page.content }}</a>
      </template>
      <a
        v-if="!(lastPageSelected() && hidePrevNext)"
        :class="[nextLinkClass, lastPageSelected() ? disabledClass : '']"
        tabindex="0"
        @click="nextPage()"
        @keyup.enter="nextPage()"><slot name="nextContent">{{ nextText }}</slot></a>
      <a
        v-if="firstLastButton"
        :class="[pageLinkClass, lastPageSelected() ? disabledClass : '']"
        tabindex="0"
        @click="selectLastPage()"
        @keyup.enter="selectLastPage()">{{ lastButtonText }}</a>
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
