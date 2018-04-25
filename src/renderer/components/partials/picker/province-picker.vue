<template>
  <md-field
    md-clearable
    class="province-picker">
    <label>Provinsi</label>
    <md-select
      v-model="selected"
      md-dense
      @md-opened="openSelect"
      @md-selected="$emit('input', selected)">
      <md-option
        v-for="item in items"
        :value="item.Code"
        :key="item.Code">{{ item.Name }}</md-option>
    </md-select>
  </md-field>
</template>

<style>
.province-picker.md-field .md-input-action.md-clear {
  right: -32px;
}
</style>

<script>
import orm from '@mixins/orm'
export default {
  name: 'ProvincePicker',
  mixins: [
    orm
  ],
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data: () => ({
    selected: null,
    items: [{ Code: 0, Name: 'Tidak Ada Data' }],
    connection: null
  }),
  methods: {
    openSelect () {
      this.getData('Provinces')
    },
    async getData (modelName, where = null) {
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
