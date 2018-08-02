<template>
  <h3 class="timeline-title">
    <div
      ref="others"
      :class="slotClass"
      :style="circleStyle"
      class="timeline-circle timeline-title-circle">
      <slot name="others" />
    </div>
    <slot />
  </h3>
</template>

<script>
import timelineItemBase from './timelineItemBase.vue'

export default {
  extends: timelineItemBase
}
</script>
