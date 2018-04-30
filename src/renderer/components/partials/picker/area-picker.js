import orm from '@mixins/orm'
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
    }
  },
  data: () => ({
    emptyItems: [{ Code: 0, Name: 'Tidak Ada Data' }],
    selected: '',
    items: [{ Code: 0, Name: 'Tidak Ada Data' }],
    connection: null,
    disabled: true,
    where: null
  }),
  template: `
    <md-field
      md-clearable
      :class="classes">
      <label>{{ label }}</label>
      <md-select
        :disabled="disabled"
        v-model="selected"
        md-dense
        @md-opened="getDate"
        @md-selected="$emit('input', selected)">
        <md-option
          v-for="item in items"
          :value="item.Code"
          :key="item.Code">{{ item.Name }}</md-option>
      </md-select>
    </md-field>
  `,
  watch: {
    regencyCode: {
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
          raw: true,
          attributes: ['Name', 'Code']
        }
        if (this.where) {
          let where = this.where
          opt.where = {where}
        }
        let data = await Model.findAll(opt)
        return data
      }
      this.connection = (new this.$orm()).withOption({
        username: 'his',
        password: 'his',
        database: 'his'
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
}
