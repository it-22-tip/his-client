<template>
  <app-wrapper>
    <page-container>
      <template slot="header">
        <h3
          class="md-title"
          style="flex: 1">Title</h3>
        <menu-feature/>
      </template>
      <div
        slot="default"
        class="padding-20">
        <div class="center"><h2>Vue Date Picker</h2></div>

        <div class="example">
          <label for="regular-date">Select a date:</label>
          <input
            id="regular-date"
            v-model="regularDate"
            type="text"
            readonly
            @focus="showRegularDate = true">

          <transition name="calendar-fade">
            <date-picker
              v-if="showRegularDate"
              v-model="regularDate"
              color="#E91E63"
              @close="showRegularDate = false"/>
          </transition>
        </div>

        <div class="example">
          <label for="min-date">Select a date starting from today:</label>
          <input
            id="min-date"
            v-model="minDate"
            type="text"
            readonly
            @focus="showMinDate = true">

          <transition name="calendar-fade">
            <date-picker
              v-if="showMinDate"
              :min="minDateLimit"
              v-model="minDate"
              color="#3F51B5"
              @close="showMinDate = false"/>
          </transition>
        </div>

        <div class="example">
          <label for="max-date">Select a date less than a week from now:</label>
          <input
            id="max-date"
            v-model="maxDate"
            type="text"
            readonly
            @focus="showMaxDate = true">

          <transition name="calendar-fade">
            <date-picker
              v-if="showMaxDate"
              :max="maxDateLimit"
              v-model="maxDate"
              color="#00BCD4"
              @close="showMaxDate = false"/>
          </transition>
        </div>

        <div class="example">
          <label for="range-date">Select a date within a week from now:</label>
          <input
            id="range-date"
            v-model="rangeDate"
            type="text"
            readonly
            @focus="showRangeDate = true">

          <transition name="calendar-fade">
            <date-picker
              v-if="showRangeDate"
              :min="minDateLimit"
              :max="maxDateLimit"
              v-model="rangeDate"
              color="#4CAF50"
              @close="showRangeDate = false"/>
          </transition>
        </div>

        <div class="example">
          <label for="range-date">Start at a specified date:</label>
          <input
            id="range-date"
            v-model="specifiedDate"
            type="text"
            readonly
            @focus="showSpecifiedDate = true">

          <transition name="calendar-fade">
            <date-picker
              v-if="showSpecifiedDate"
              v-model="specifiedDate"
              color="#FF9800"
              @close="showSpecifiedDate = false"/>
          </transition>
        </div>

        <div class="example">
          <label for="range-date">Format the chosen date:</label>
          <input
            id="formatted-date"
            v-model="formattedDate"
            type="text"
            readonly
            @focus="showFormattedDate = true">

          <transition name="calendar-fade">
            <date-picker
              v-if="showFormattedDate"
              :format="formatDate"
              v-model="formattedDate"
              color="#FF5722"
              @close="showFormattedDate = false"/>
          </transition>
        </div>
      </div>
      <page-footer slot="footer">
        <div>FOOTER</div>
      </page-footer>
    </page-container>
  </app-wrapper>
</template>

<script>
import moment from 'moment'
export default {

  data () {
    return {
      regularDate: '',
      showRegularDate: false,

      minDateLimit: '',
      minDate: '',
      showMinDate: false,

      maxDateLimit: '',
      maxDate: '',
      showMaxDate: false,

      rangeDate: '',
      showRangeDate: false,

      specifiedDate: '1950-01-01',
      showSpecifiedDate: false,

      formattedDate: '',
      showFormattedDate: false
    }
  },
  created: function () {
    var today = new Date()

    this.minDateLimit = '' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

    this.maxDateLimit = '' + today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 7)
  },

  methods: {
    formatDate: function (date) {
      return moment(date).format('LL')
    }
  }
}
</script>
