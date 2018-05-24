<template>
  <md-content class="fc">
    <md-content class="scr md-scrollbar">
      <div class="hi">
        <div :style="{ padding: '10px' }">
          <textarea
            v-model="savedView"
            :style="{ padding: '10px', lineHeight: '20px', width: '100%', resize: 'none', height: '100px', border: '0 none' }"/>
        </div>
        <mstepper>
          <stepper-personal/>
          <stepper-address/>
          <stepper-education/>
          <stepper-jobtitle/>
          <stepper-fin/>
        </mstepper>
      </div>
    </md-content>
  </md-content>
</template>

<script>
import stepperEducation from '@partials/stepper/stepper-education'
import stepperFin from '@partials/stepper/stepper-fin'
import stepperAddress from '@partials/stepper/stepper-address'
import stepperJobtitle from '@partials/stepper/stepper-jobtitle'
import stepperPersonal from '@partials/stepper/stepper-personal'
export default {
  components: {
    'mstepper': () => import('@partials/form/mstepper'),
    stepperPersonal,
    stepperAddress,
    stepperEducation,
    stepperJobtitle,
    stepperFin
  },
  data () {
    return {
      savedView: {}
    }
  }
}
</script>

<style lang="scss">
.dp {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.fc {
  flex: 1;
  position: relative;
}
.scr {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}
.hi {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.hi>.md-steppers {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.hi>.md-steppers>.md-steppers-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.hi>.md-steppers>.md-steppers-wrapper>.md-steppers-container {
  height: 100%;
  flex: 1;
}
.hi>.md-steppers>.md-steppers-wrapper>.md-steppers-container .md-stepper {
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.hi>.md-steppers>.md-steppers-wrapper>.md-steppers-container .md-stepper .md-stepper-content {
  padding: 0;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}

.hi>.md-steppers>.md-steppers-wrapper>.md-steppers-container .md-stepper .md-stepper-content::-webkit-scrollbar {
  border-radius: 0;
  height: 8px;
  width: 8px;
}
.hi>.md-steppers>.md-steppers-wrapper>.md-steppers-container .md-stepper .md-stepper-content::-webkit-scrollbar-thumb {
  border-radius: 0;
}
.hi>.md-steppers>.md-steppers-wrapper>.md-steppers-container .md-stepper .md-stepper-content::-webkit-scrollbar-thumb {
  background: rgba(#757575, .5) !important;
}

.big {
  height: 1000px;
}
.mo:hover {
  text-decoration: underline;
}
</style>
