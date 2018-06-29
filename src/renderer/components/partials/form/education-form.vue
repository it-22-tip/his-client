<template>
  <div>
    <div v-if="db.length > 0">
      <p
        v-for="itm in db"
        :key="itm.id">
        Tingkat: {{ itm.level }}<br>
        Nama: {{ itm.name }}<br>
        Nilai: {{ itm.score }}<br>
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
        <label for="level">Level</label>
        <md-select
          id="level"
          v-model="current.level"
          :md-selected="selected"
          name="level">
          <md-option
            v-for="level in availableLevels"
            :value="level"
            :key="level">
            {{ level }}
          </md-option>
        </md-select>
      </md-field>
      <div>
        <birthplace-picker v-model="BirthPlaceRegency"/>
      </div>
      <md-field>
        <label>Nilai</label>
        <md-input v-model="current.score"/>
      </md-field>
      <md-field>
        <label>Nama</label>
        <md-input v-model="current.name"/>
      </md-field>
    </div>
  </div>
</template>

<script>
import { filter, random, find, without } from 'lodash'
export default {
  name: 'EducationForm',
  components: {
    'birthplace-picker': () => import('@partials/picker/birthplace-picker')
  },
  data () {
    return {
      BirthPlaceRegency: '',
      db: [
        {
          id: 1,
          level: 'SD',
          name: 'SD 01 Pagi'
        }
      ],
      levels: [
        'SD',
        'SMP',
        'SMA',
        'D3',
        'S1',
        'S2',
        'S3'
      ],
      current: {
        name: null,
        level: null,
        score: null,
        regencyId: null
      },
      regency: null,
      province: null
    }
  },
  computed: {
    availableLevels: {
      get () {
        let sd = find(this.db, function (o) { return o.level === 'SD' })
        let smp = find(this.db, function (o) { return o.level === 'SMP' })
        let sma = find(this.db, function (o) { return o.level === 'SMA' })
        let levels = this.levels
        if (sd) levels = without(levels, 'SD')
        if (smp) levels = without(levels, 'SMP')
        if (sma) levels = without(levels, 'SMA')
        return levels
      },
      set () {

      }
    }
  },
  validation: {

  },
  methods: {
    add () {
      let z = [{
        id: random(0, 100),
        level: this.current.level,
        name: this.current.name,
        score: this.current.score
      }]
      console.log(z)
      this.db = this.db.concat(z)
      console.log(this.db)
      this.current.level = null
    },
    remove (itm) {
      console.log('remove ' + itm.id)
      let a = filter(this.db, function (el) {
        return el.id !== itm.id
      })
      this.db = a
    },
    selected () {
    }
  }
}
</script>
