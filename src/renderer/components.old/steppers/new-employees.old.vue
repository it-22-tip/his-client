<template>
  <md-content class="fc">
    <md-content class="scr md-scrollbar">
      <div class="hi">
        <mstepper
          :md-active-step.sync="active"
          md-linear>
          <step-personal
            id="personal-stepper"
            :active="active === 'address-stepper'"
            v-model="personal"
            @forth="active = 'address-stepper'"/>
          <step-address
            id="address-stepper"
            :active="active === 'education-stepper'"
            @forth="active = 'education-stepper'"
            @back="active = 'personal-stepper'"/>
          <step-education
            id="education-stepper"
            :active="active !== 'education-stepper'"
            @forth="active = 'jobtitle-stepper'"
            @back="active = 'address-stepper'"/>
          <step-jobtitle
            id="jobtitle-stepper"
            :active="active !== 'jobtitle-stepper'"
            @forth="active = 'fin-stepper'"
            @back="active = 'address-stepper'"/>
          <step-fin
            id="fin-stepper"
            :active="active !== 'fin-stepper'"
            @save="saving"
            @back="active = 'jobtitle-stepper'"/>
        </mstepper>
      </div>
    </md-content>
  </md-content>
</template>

<script>
import StepEducation from '@components/steps/step-education'
import StepFin from '@components/steps/step-fin'
import StepAddress from '@components/steps/step-address'
import StepJobtitle from '@components/steps/step-jobtitle'
import StepPersonal from '@components/steps/step-personal'
import mstepper from '@components/form/mstepper'

let components = {
  'step-personal': StepPersonal,
  'step-address': StepAddress,
  'step-education': StepEducation,
  'step-jobtitle': StepJobtitle,
  'step-fin': StepFin
}

console.log(components)

const comp = {
  StepPersonal,
  StepAddress,
  StepEducation,
  StepJobtitle,
  StepFin,
  mstepper
}

export default {
  components: comp,
  data () {
    return {
      personal: null,
      savedView: {},
      active: 'personal-stepper',
      comps: components
    }
  },
  watch: {
    personal: {
      handler: function (val) {
        return val
      }
    }
  },
  methods: {
    saving () {
      console.log('saving')
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
