<script setup lang="ts">
import { ref } from "vue";
const number = ref(65);
</script>
<template>
  <div class="q-gutter-md">
    <q-slider v-model="number" :min="0" :max="100" label color="primary" />
  </div>
</template>
