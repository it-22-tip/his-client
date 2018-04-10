<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item">
      <md-field>
        <label for="province">{{ label }}</label>
        <md-select @md-selected="onSelected" v-model="selected" name="province" md-dense>
          <md-option v-for="(province) in provinces" :value="province.name" :key="province.name">{{ province.name }}</md-option>
        </md-select>
      </md-field>
    </div>
  </div>
</template>

<script>
  import { mapValues, pick } from 'lodash'
  import { models } from '@/orm'
  export default {
    name: 'provinceField',
    props: {
      default: {
        type: String
      },
      label: {
        type: String
      }
    },
    data () {
      return {
        selected: null,
        provinces: []
      }
    },
    methods: {
      onSelected ($event) {
        this.$emit('selected', $event)
      },
      getProvinceList () {
        const {Provinces} = models
        console.log(Provinces)
        return Provinces.findAll({attributes: [['id', 'key'], 'name']})
        .then(result => {
          result = mapValues(result, (value) => {
            return pick(value.dataValues, ['key', 'name'])
          })
          return Object.values(result)
        })
      }
    },
    mounted () {
      this.selected = this.default
    },
    created () {
      this.getProvinceList().then((list) => { this.provinces = list })
    }
  }
</script>
