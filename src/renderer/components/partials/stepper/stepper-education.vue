<template>
  <md-step
    id="ext"
    md-label="ext">
    <div>
      <md-field>
        <label>Nama</label>
        <md-input v-model="saved.Person.Name"/>
      </md-field>
      <gender-picker v-model="saved.Person.Gender"/>
      <bloodtype-picker v-model="saved.Person.BloodType"/>
      <md-subheader>Tempat Tanggal Lahir</md-subheader>
      <birthdateplace-form
        v-model="birthDatePlace"
        title="Alamat Resmi"/>
    </div>
  </md-step>
</template>
