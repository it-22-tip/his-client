<template>
  <div>
    <md-subheader>{{ formTitle }}</md-subheader>
    <div class="md-layout">
      <div class="md-layout-item md-size-85">
        <province-picker v-model="ProvinceCode"/>
        <regency-picker
          v-model="RegencyCode"
          :where-code="ProvinceCode"/>
        <district-picker
          v-model="DistrictCode"
          :where-code="RegencyCode"/>
        <village-picker
          v-model="VillageCode"
          :where-code="DistrictCode"/>
      </div>
    </div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-25">
        <md-field>
          <label>RW</label>
          <md-input
            v-model="Rt"
            type="number"
            max="20"
            min="0"/>
        </md-field>
      </div>
      <div class="md-layout-item md-size-25">
        <md-field>
          <label>RW</label>
          <md-input
            v-model="Rw"
            type="number"
            max="20"
            min="0"/>
        </md-field>
      </div>
    </div>
    <md-field>
      <label>Nama Dusun/Perumahan/Jalan dan Nomor</label>
      <md-input
        v-model="Address"/>
    </md-field>
  </div>
</template>
<script>
export default {
  components: {
    'province-picker': () => import('@partials/picker/province-picker'),
    'regency-picker': () => import('@partials/picker/regency-picker'),
    'district-picker': () => import('@partials/picker/district-picker'),
    'village-picker': () => import('@partials/picker/village-picker')
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: Object,
      default: () => {
        return this.input
      }
    },
    preDefined: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      formTitle: this.title,
      ProvinceCode: null,
      RegencyCode: null,
      DistrictCode: null,
      VillageCode: null,
      Rw: null,
      Rt: null,
      Address: null,
      input: {
        VillageCode: null,
        Rw: null,
        Rt: null,
        Address: null
      }
    }
  },
  watch: {
    VillageCode: {
      handler: function (val) {
        this.$emit('input', {
          VillageCode: val,
          Rw: this.Rw,
          Rt: this.Rt,
          Address: this.Address
        })
      }
    }
  }
}
</script>
