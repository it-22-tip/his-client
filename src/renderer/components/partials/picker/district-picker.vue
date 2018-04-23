<template>
  <md-field>
    <label>Kecamatan</label>
    <md-select v-model="selectedItem">
      <md-option v-for="item in items" :value="item.id" :key="item.id"> {{ item.name }} </md-option>
    </md-select>
  </md-field>
</template>

<script>
export default {
  name: 'DistrictPicker',
  data: () => ({
    selectedItem: null,
    items: []
  }),
  computed: {
    getObject() {
      return this.items.find(item => item.id === this.selectedItem);
    },
    getObjects() {
      return this.items.filter(item => this.selectedItems.includes(item.id));
    }
  },
  mounted () {
    this.items = [
      {
        id: 1,
        name: "test1"
      },
      {
        id: 2,
        name: "test2"
      },
      {
        id: 3,
        name: "test3"
      }
    ]
    this.$nextTick().then(
      () => {
        this.selectedItem = 2
      }
    )
  }
};
</script>

