<template>
  <div>
    <div v-if="db.length > 0">
      <p
        v-for="itm in db"
        :key="itm.id">
        {{ itm.id }}
        {{ itm.level }}
        <md-button
          class="md-raised"
          @click="remove(itm)">
          -
        </md-button>
      </p>
    </div>
    <div>
      <md-button
        class="md-raised md-primary"
        @click="add">
        +
      </md-button>
      <md-field>
        <label for="movie">Movie</label>
        <md-select
          id="movie"
          v-model="selected"
          name="movie">
          <md-option value="SD">SD</md-option>
          <md-option value="SMP">SMP</md-option>
          <md-option value="SMA">SMA</md-option>
          <md-option value="D3">D3</md-option>
          <md-option value="S1">S1</md-option>
        </md-select>
      </md-field>
    </div>
  </div>
</template>

<script>
import { filter, random } from 'lodash'
export default {
  name: 'EducationForm',
  data () {
    return {
      db: [
        {
          id: 1,
          level: 'SD'
        }
      ],
      selected: null
    }
  },
  methods: {
    add () {
      let z = [{
        id: random(0, 100),
        level: this.selected
      }]
      console.log(z)
      this.db = this.db.concat(z)
      console.log(this.db)
    },
    remove (itm) {
      console.log('remove ' + itm.id)
      let a = filter(this.db, function (el) {
        return el.id !== itm.id
      })
      this.db = a
    }
  }
}
</script>
