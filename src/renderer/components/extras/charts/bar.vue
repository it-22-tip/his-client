<template>
  <div>
    <canvas v-if="!target" ref="canvas" :width="width" :height="height">
  </div>
</template>
<script>
import core from './core'
export default {
  mixins: [
    core
  ],
  name: 'BarChart',
  data() {
    return {
      type: 'bar',
      chart_data: {
        labels: this.labels,
        datasets: [{
          type: 'bar',
          label: this.datalabel,
          backgroundColor: this.backgroundcolor,
          borderColor: this.bordercolor,
          borderWidth: 1,
          data: this.data
        }]
      }
    }
  }
}
</script>
