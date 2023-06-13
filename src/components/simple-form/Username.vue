<template>
  <div class="mb-3">
    <label for="inputUsername" class="form-label">Username</label>
    <input
        type="text"
        class="form-control"
        id="inputUsername"
        :class="{'is-valid': validation, 'is-invalid': !validation}"
        v-model="username"
        @input="$emit('username-changed', username)"
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
      username: '',
    }
  },
  computed: {
    validation() {
      return this.username.length >= 4 && this.username.length <= 13
    }
  }
}
</script>