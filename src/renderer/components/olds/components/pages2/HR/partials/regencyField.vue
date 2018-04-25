<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item">
      <md-field>
        <label>Kabupaten/Kota</label>
        <md-select
          md-dense
          @md-selected="onSelected">
          <md-option
            v-for="(regency) in regencies"
            :value="regency.name"
            :key="regency.name">{{ regency.name }}</md-option>
        </md-select>
      </md-field>
    </div>
  </div>
</template>

<script>
import { mapValues, pick } from 'lodash'
import { models } from '@/orm'
export default {
  name: 'RegencyField',
  components: {
    'regency-field': () => import('./regencyField')
  },
  props: {
    province: {
      type: String
    },
    label: {
      type: String
    },
    default: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      enabled: false,
      selected: {},
      regencies: null
    }
  },
  watch: {
    act (value) {
      this.enabled = value
    },
    province (value) {
      this.getRegencyList(value).then((list) => {
        this.regencies = list
      })
    }
  },
  created () {

  },
  methods: {
    getDisabled () {
      return true
    },
    onSelected ($event) {
      this.$emit('selected', $event)
    },
    getRegencyList (provinceName) {
      const { Regencies, Provinces } = models
      return Regencies.findAll({
        attributes: [['id', 'key'], 'name'],
        include: [
          {
            model: Provinces,
            where: {
              name: provinceName
            }
          }
        ]
      })
        .then(result => {
          result = mapValues(result, (value) => {
            return pick(value.dataValues, ['key', 'name'])
          })
          return Object.values(result)
        })
    }
  }
}
</script>
