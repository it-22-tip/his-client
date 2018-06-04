<template>
  <md-content class="fc">
    <md-content class="scr md-scrollbar">
      <div class="hi">
        <mstepper
          :md-active-step.sync="active"
          md-linear>
          <component
            v-for="item in comps"
            :id="'step-' + item.key"
            :is="item.name"
            :key="item.key"
            :done="item.done"
            @forth="forth($event, item.key)"
            @back="back(item.key)"/>
        </mstepper>
      </div>
    </md-content>
  </md-content>
</template>

<script>
import { map } from 'lodash'
import StepEducation from '@partials/steps/step-education'
import StepFin from '@partials/steps/step-fin'
import StepAddress from '@partials/steps/step-address'
import StepJobtitle from '@partials/steps/step-jobtitle'
import StepPersonal from '@partials/steps/step-personal'
import mstepper from '@partials/form/mstepper'

let components = [
  { key: 1, name: 'step-personal', done: false },
  { key: 2, name: 'step-address', done: false },
  { key: 3, name: 'step-education', done: false },
  { key: 4, name: 'step-jobtitle', done: false },
  { key: 5, name: 'step-fin', done: false }
]

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
      savedView: {},
      comps: components,
      activeComp: 1
    }
  },
  computed: {
    active () {
      return 'step-' + this.activeComp
    }
  },
  methods: {
    cd (v, bf) {
      this.comps = map(this.comps, val => {
        if (bf === 'forth' && val.key === v) {
          val.done = true
        }
        if ((bf === 'back' && val.key === v) || (bf === 'back' && val.key === 1 && v === 2)) {
          val.done = false
        }
        return val
      })
    },
    forth (data, v) {
      if (v === this.comps.length) {
        this.saving()
        return
      }
      this.cd(v, 'forth')
      this.activeComp = v + 1
      console.log('test')
      console.log(data)
    },
    back (v) {
      if (v === 1) return
      this.cd(v, 'back')
      this.activeComp = v - 1
    },
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
