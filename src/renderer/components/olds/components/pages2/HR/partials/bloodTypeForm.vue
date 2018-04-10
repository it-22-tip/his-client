<template>
  <div class="blood-type-form">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-subheader>Golongan Darah</md-subheader>
        <md-list>
          <md-list-item v-for="(type) in bloodTypesRadio" :key="type">
            <md-radio v-model="selectedBloodType" :value="type"/>
            <span class="md-list-item-text">{{ type }}</span>
          </md-list-item>
        </md-list>
      </div>
      <div class="md-layout-item">
        <md-subheader>Rhesus</md-subheader>
        <md-list>
          <md-list-item v-for="(typeRh) in bloodTypesRhRadios" :key="typeRh">
            <md-radio v-model="selectedBloodTypeRh" :value="typeRh"/>
            <span class="md-list-item-text">{{ typeRh }}</span>
          </md-list-item>
        </md-list>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bloodTypeForm',
    props: [
      'bloodtype',
      'bloodtyperh'
    ],
    data() {
      return {
        selectedBloodType: 'N/A',
        selectedBloodTypeRh: 'N/A',
        bloodTypesRadio: [
          'A',
          'B',
          'AB',
          'O',
          'N/A'
        ],
        bloodTypesRhRadios: [
          'Positive',
          'Negative',
          'N/A'
        ]
      }
    }
  }
</script>
