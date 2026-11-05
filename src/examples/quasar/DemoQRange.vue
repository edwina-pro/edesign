<script setup lang="ts">
import { ref } from "vue";
const range = ref({ min: 20, max: 70 });
</script>
<template>
  <div class="q-gutter-md">
    <q-range v-model="range" :min="0" :max="100" label color="primary" />
  </div>
</template>
