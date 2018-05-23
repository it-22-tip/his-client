<template>
  <div>
    <md-subheader>{{ formTitle }}</md-subheader>
    <div class="md-layout">
      <div class="md-layout-item md-size-50">
        <province-picker v-model="ProvinceCode"/>
      </div>
      <div class="md-layout-item md-size-50">
        <regency-picker
          v-model="RegencyCode"
          :where-code="ProvinceCode"/>
      </div>
      <div class="md-layout-item md-size-50">
        <district-picker
          v-model="DistrictCode"
          :where-code="RegencyCode"/>
      </div>
      <div class="md-layout-item md-size-50">
        <village-picker
          v-model="VillageCode"
          :where-code="DistrictCode"/>
      </div>
    </div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-50">
        <md-field
          md-clearable
          class="region-picker">
          <label>RW</label>
          <md-input
            v-model="Rt"
            type="number"
            max="20"
            min="0"/>
        </md-field>
      </div>
      <div class="md-layout-item md-size-50">
        <md-field
          md-clearable
          class="region-picker">
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
      <label>Dusun/Perumahan/Jalan</label>
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
      default: () => ({})
    },
    preDefined: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
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
      Address: null
    }
  },
  computed: {
    input: {
      get: function () {
        return {
          Rt: this.Rt,
          Rw: this.Rw,
          Address: this.Address,
          VillageCode: this.VillageCode,
          Type: this.type
        }
      }
    }
  },
  watch: {
    input: function (value) {
      if (value.VillageCode !== null) this.$emit('input', value)
    }
  }
}
</script>
