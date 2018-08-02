<template>
  <md-field
    md-clearable>
    <label>Job Title</label>
    <md-select
      :disabled="disabled"
      v-model="selected"
      md-dense
      @md-opened="getData"
      @md-selected="$emit('input', selected)">
      <md-option
        v-for="item in items"
        :value="item.Id"
        :key="item.Id">{{ item.Name }}</md-option>
    </md-select>
  </md-field>
</template>

<script>
import orm from '@mixins/orm'
export default {
  mixins: [
    orm
  ],
  props: {
    value: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    emptyItems: [{ Code: 0, Name: 'Tidak Ada Data' }],
    selected: null,
    items: [{ Code: 0, Name: 'Tidak Ada Data' }],
    connection: null,
    disabled: false,
    where: null
  }),
  watch: {
    whereCode: {
      handler: function (val) {
        if (val === null) {
          this.selected = null
          this.disabled = false
        } else {
          this.selected = null
          this.getData()
        }
      }
    }
  },
  methods: {
    async getData () {
      console.log('getting data')
      const transaction = async transaction => {
        const { JobTitles } = this.connection.models
        const opt = {
          transaction: transaction,
          raw: false,
          attributes: ['Id', 'Name']
        }
        let data = await JobTitles.findAll(opt)
        return data
      }
      this.connection = (new this.$orm()).connect()
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
}
</script>
