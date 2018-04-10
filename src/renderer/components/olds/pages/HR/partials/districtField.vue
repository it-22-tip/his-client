<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item">
      <md-field>
        <label>Kecamatan</label>
        <md-select @md-selected="onSelected" md-dense>
          <md-option v-for="(district) in districts" :value="district.name" :key="district.name">{{ district.name }}</md-option>
        </md-select>
      </md-field>
    </div>
  </div>
</template>

<script>
  import { mapValues, pick } from 'lodash'
  import { models } from '@/orm'
  export default {
    name: 'districtField',
    props: {
      regency: {
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
        districts: null
      }
    },
    watch: {
      act (value) {
        this.enabled = value
      },
      regency (value) {
        this.getdistrictList(value).then((list) => {
          this.districts = list
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
      getdistrictList (regencyName) {
        { Districts, Regencies }
        return Districts.findAll({
          attributes: [['id', 'key'], 'name'],
          include: [
            {
              model: Regencies,
              where:{
                name: regencyName
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
    },
    created () {

    },
    components: {
      'district-field': () => import('./districtField')
    }
  }
</script>
