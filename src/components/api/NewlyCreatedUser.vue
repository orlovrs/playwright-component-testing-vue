<template>
  <div class="spinner-border" role="status" id="spinner" v-if="isLoading">
  </div>
  <div class="mb-5" id="error" v-if="isError">Something went wrong, try to reload the page...</div>
  <div class="card mb-5" style="width: 25rem;" v-if="!isLoading && !isError">
    <img class="card-img-top" :src="picUrl" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{fullname}}</h5>
      <p class="card-text">{{address}}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Email: {{email}}</li>
      <li class="list-group-item">Phone: {{phone}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      isError: false,
      picUrl: '',
      fullname: '',
      address: '',
      email: '',
      phone: ''
    }
  },
  mounted() {
    this.axios.get('https://randomuser.me/api')
        .then((res) => {
          const json = res.data.results[0];
          this.picUrl = json.picture.large;
          this.fullname = `${json.name.first} ${json.name.last}`;
          this.address = `${json.location.city}, ${json.location.country}`;
          this.email = json.email;
          this.phone = json.phone;
          this.isError = false;
        })
        .catch(() => {
          this.isError = true;
        })
        .finally(() => {
          this.isLoading = false;
        })
  }
}
</script>