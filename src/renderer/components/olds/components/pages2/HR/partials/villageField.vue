<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item">
      <md-field>
        <label>Kelurahan/Desa</label>
        <md-select
          md-dense
          @md-selected="onSelected">
          <md-option
            v-for="(village) in villages"
            :value="village.name"
            :key="village.name">{{ village.name }}</md-option>
        </md-select>
      </md-field>
    </div>
  </div>
</template>

<script>
import { mapValues, pick } from 'lodash'
import { models } from '@/orm'
export default {
  name: 'VillageField',
  props: {
    district: {
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
    },
    act: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      enabled: false,
      selected: {},
      villages: null
    }
  },
  watch: {
    act (value) {
      this.enabled = value
    },
    district (value) {
      this.getvillageList(value).then((list) => {
        this.villages = list
      })
    }
  },
  methods: {
    getDisabled () {
      return true
    },
    onSelected ($event) {
      this.$emit('selected', $event)
    },
    getvillageList (districtName) {
      const { Villages, Districts } = models
      return Villages.findAll({
        attributes: [['id', 'key'], 'name'],
        include: [
          {
            model: Districts,
            where: {
              name: districtName
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
