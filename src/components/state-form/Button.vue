<template>
  <div class="col-12">
    <button
        class="btn"
        :class="getButtonClass"
        type="submit"
        @click.prevent>{{ label }}
    </button>
  </div>
</template>

<script>
export default {
  props: ['btnType', 'label'],
  computed: {
    getButtonClass() {
      switch (this.btnType) {
        case 'secondary': return 'btn-secondary';
        case 'success': return 'btn-success';
        case 'warning': return 'btn-warning';
        case 'danger': return 'btn-danger';
        case 'info': return 'btn-info';
        case 'light': return 'btn-light';
        case 'dark': return 'btn-dark';
        case 'link': return 'btn-link';
        default: return 'btn-primary';
      }
    }
  }
}
</script>