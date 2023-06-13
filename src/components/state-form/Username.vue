<template>
  <div class="mb-3">
    <label for="inputUsername" class="form-label">Username</label>
    <input
        type="text"
        class="form-control"
        id="inputUsername"
        :class="{'is-valid': isValid, 'is-invalid': !isValid}"
        v-model="username"
        @input="updateUsername"
        required />
    <div class="valid-feedback">
      Looks good!
    </div>
    <div class="invalid-feedback">
      Username should be between 4 and 13 characters long.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    }
  },
  methods: {
    updateUsername() {
      this.$store.commit('setUsername', this.username);
    }
  },
  computed: {
    isValid() {
      return this.$store.getters.getIsValid;
    }
  }
};
</script>