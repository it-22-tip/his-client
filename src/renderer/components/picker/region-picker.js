import orm from '@mixins/orm'
import './region-picker.css'
export default {
  mixins: [
    orm
  ],
  props: {
    value: {
      type: String,
      default: null
    },
    whereCode: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    emptyItems: [{ Code: 0, Name: 'Tidak Ada Data' }],
    selected: '',
    items: [{ Code: 0, Name: 'Tidak Ada Data' }],
    connection: null,
    where: null
  }),
  template: `
    <md-field
      md-clearable
      class="region-picker"
      :class="classes">
      <label>{{ label }}</label>
      <md-select
        :disabled="disabled"
        v-model="selected"
        md-dense
        @md-opened="getData"
        @md-selected="$emit('input', selected)">
        <md-option
          v-for="item in items"
          :value="item.Code"
          :key="item.Code">{{ item.Name }}</md-option>
      </md-select>
    </md-field>
  `,
  watch: {
    whereCode: {
      handler: function (val) {
        if (val === '') {
          this.selected = ''
          this.disabled = true
        } else {
          this.selected = ''
          this.getData()
        }
      }
    }
  },
  methods: {
    async getData () {
      const transaction = async transaction => {
        const Model = this.connection.models[this.modelName]
        const opt = {
          transaction: transaction,
          raw: false,
          attributes: ['Name', 'Code']
        }
        if (this.where) {
          let key = this.where
          opt.where = {}
          opt.where[key] = this.whereCode
        }
        let data = await Model.findAll(opt)
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
