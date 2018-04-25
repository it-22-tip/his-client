<template>
  <div>
    <md-field>
      <label for="book">Book</label>
      <md-select v-model="selected">
        <md-option
          v-for="book in selection"
          :value="book.id"
          :key="book.id">{{ book.title }}</md-option>
      </md-select>
    </md-field>
    <md-button @click="selected = 2">Choose vue.js 2 cookbook</md-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: '',
      selection: []
    }
  },
  mounted () {
    this.selection = [
      {
        id: 1,
        title: 'learning vue.js 2'
      },
      {
        id: 2,
        title: 'vue.js 2 cookbook'
      }
    ]
    this.selected = 1
  }
}
</script>
