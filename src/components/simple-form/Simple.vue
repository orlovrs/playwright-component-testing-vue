<template>
  <h1 class="mt-3">Simple form:</h1>
  <form class="row g-3 needs-validation mb-3" novalidate>
    <Username @username-changed="(name) => username = name"/>
    <VueDatePicker
        v-model="date"
        :min-date="get70YearsPastFromToday()"
        :max-date="new Date()" />
    <Button
        btn-type="dark"
        label="Press this button"/>
  </form>
  <div id="feedback" class="mb-3">
    <p>Username: {{ username }}</p>
    <p>Chosen date: {{ date }}</p>
  </div>
</template>

<script>
import Button from "./Button.vue";
import Username from "./Username.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: {VueDatePicker, Username, Button},
  data() {
    return {
      username: '',
      date: ''
    }
  },
  methods: {
    get70YearsPastFromToday() {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 70);
      return date;
    }
  }
}
</script>