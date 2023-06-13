<script setup xmlns="http://www.w3.org/1999/html">
import Simple from "./components/simple-form/Simple.vue";
import State from "./components/state-form/State.vue";
import NewlyCreatedUser from "@/components/api/NewlyCreatedUser.vue";
</script>

<template>
  <div class="container">
    <Simple />
    <br />
    <State />
    <br />
    <h1>Greet a newcomer:</h1>
    <NewlyCreatedUser />
  </div>
</template>