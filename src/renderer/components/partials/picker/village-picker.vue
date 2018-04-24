<template>
  <md-field md-clearable class="village-picker">
    <label>Kelurahan Desa</label>
    <md-select :disabled="disabled" v-model="selected" @md-opened="openSelect" @md-selected="$emit('input', selected)" md-dense>
      <md-option v-for="item in items" :value="item.Code" :key="item.Code"> {{ item.Name }} </md-option>
    </md-select>
  </md-field>
</template>

<style>
.village-picker.md-field .md-input-action.md-clear {
  right: -32px;
}
</style>

<script>
import orm from '@mixins/orm'
export default {
  name: 'VillagePicker',
  mixins: [
    orm
  ],
  props: [
    'value',
    'districtCode'
  ],
  data: () => ({
    emptyItems: [{ Code: 0, Name: 'Tidak Ada Data' }],
    selected: '',
    items: [{ Code: 0, Name: 'Tidak Ada Data' }],
    connection: null,
    disabled: true
  }),
  watch: {
    districtCode: {
      handler: function (val) {
        if (val === '') {
          this.selected = ''
          this.disabled = true
        } else {
          this.selected = ''
          this.openSelect()
        }
      }
    }
  },
  mounted () {
    console.log(this.value)
    this.$nextTick().then(
      () => {
        selected = this.value
      }
    )
  },
  methods: {
    openSelect () {
      this.getData('Villages', { DistrictCode: this.districtCode })
    },
    async getData(modelName, where = null) {
      const transaction = async transaction => {
        const Model = this.connection.models[modelName]
        const opt = {
          transaction: transaction,
          raw: true,
          attributes: ['Name', 'Code']
        }
        if (where) opt.where = where
        let data = await Model.findAll(opt)
        return data
      }
      this.connection = (new this.$orm).withOption({
        username: 'his',
        password: 'his',
        database: 'his',
      }).connect()
      try {
        this.items = await this.connection.transaction(transaction)
        this.disabled = false
        this.$nextTick().then(
          () => {
            // if (this.selected === '') this.selected = this.items[0].Code
          }
        )
      } catch (error) {
        console.log({error})
      } finally {
        await this.closeConnection()
      }
    }
  }
};
</script>

