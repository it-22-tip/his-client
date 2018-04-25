<template>
  <md-content class="address-picker md-layout">
    <md-content class="md-layout-item md-size-85">
      <province-picker v-model="ProvinceCode"/>
      <regency-picker
        v-model="RegencyCode"
        :province-code="ProvinceCode"/>
      <district-picker
        v-model="DistrictCode"
        :regency-code="RegencyCode"/>
      <village-picker
        v-model="VillageCode"
        :district-code="DistrictCode"/>
      <md-field md-clearable>
        <label>RT</label>
        <md-input
          type="number"
          min="1"
          max="20"/>
      </md-field>
      <md-field md-clearable>
        <label>RW</label>
        <md-input
          type="number"
          min="1"
          max="20"/>
      </md-field>
    </md-content>
  </md-content>
</template>

<script>
import Orm from '@mixins/orm'
export default {
  name: 'AddressPicker',
  components: {
    'province-picker': () => import('./province-picker'),
    'regency-picker': () => import('./regency-picker'),
    'district-picker': () => import('./district-picker'),
    'village-picker': () => import('./village-picker')
  },
  mixins: [
    Orm
  ],
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      ProvinceCode: '',
      RegencyCode: '',
      DistrictCode: '',
      VillageCode: ''
    }
  },
  watch: {
    VillageCode: {
      handler: function (val) {
        this.$emit('input', val)
      }
    },
    DistrictCode: {
      handler: function (val) {
        if (val === '') {
          this.VillageCode = ''
        }
      }
    },
    RegencyCode: {
      handler: function (val) {
        if (val === '') {
          this.DistrictCode = ''
        }
      }
    },
    ProvinceCode: {
      handler: function (val) {
        if (val === '') {
          this.RegencyCode = ''
        }
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const transaction = async transaction => {
        const { Provinces, Regencies, Districts, Villages } = this.connection.models
        const opt = {
          transaction: transaction,
          raw: true,
          attributes: ['Name', 'Code']
        }
        opt.where = {
          Code: '1303051002'
        }
        opt.include = [
          {
            model: Districts,
            attributes: ['Code'],
            include: [
              {
                model: Regencies,
                attributes: ['Code'],
                include: [
                  {
                    model: Provinces,
                    attributes: ['Code']
                  }
                ]
              }
            ]
          }
        ]
        let data = await Villages.findOne(opt)
        this.ProvinceCode = data['District.Regency.Province.Code']
        this.RegencyCode = data['District.Regency.Code']
        this.DistrictCode = data['District.Code']
        this.VillageCode = data['Code']
        this.$nextTick().then(
          () => {

          }
        )
      }
      this.connection = (new this.$orm()).withOption({
        username: 'his',
        password: 'his',
        database: 'his'
      }).connect()
      try {
        let data = await this.connection.transaction(transaction)
        this.items = data
        this.$nextTick().then(
          () => {
            this.selected = this.value
          }
        )
      } catch (error) {
        console.log({error})
      } finally {
        await this.closeConnection()
      }
    }
  }
}
</script>
