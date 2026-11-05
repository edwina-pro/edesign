<script setup lang="ts">
import { ref } from "vue";
const number = ref(65);
</script>
<template>
  <div class="q-gutter-md">
    <q-linear-progress
      :value="number / 100"
      color="primary"
      rounded
      size="9px"
    /><q-slider v-model="number" :min="0" :max="100" label />
  </div>
</template>
