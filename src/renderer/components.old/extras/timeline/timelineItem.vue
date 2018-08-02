<template>
  <li class="timeline-item">
    <div
      ref="others"
      :class="slotClass"
      :style="circleStyle"
      class="timeline-circle">
      <slot name="others" />
    </div>
    <slot />
  </li>
</template>

<script>
import timelineItemBase from './timelineItemBase.vue'

export default {
  extends: timelineItemBase
}
</script>
