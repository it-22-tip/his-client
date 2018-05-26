<template>
  <md-content class="fc">
    <md-content class="scr md-scrollbar">
      <div class="hi">
        <mstepper>
          <step-personal/>
          <step-address/>
          <step-education/>
          <step-jobtitle/>
          <step-fin/>
        </mstepper>
      </div>
    </md-content>
  </md-content>
</template>

<script>
import StepEducation from '@partials/steps/step-education'
import StepFin from '@partials/steps/step-fin'
import StepAddress from '@partials/steps/step-address'
import StepJobtitle from '@partials/steps/step-jobtitle'
import StepPersonal from '@partials/steps/step-personal'
export default {
  components: {
    'mstepper': () => import('@partials/form/mstepper'),
    StepPersonal,
    StepAddress,
    StepEducation,
    StepJobtitle,
    StepFin
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
