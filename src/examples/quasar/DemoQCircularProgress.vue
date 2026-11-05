<script setup lang="ts">
import { ref } from "vue";
const number = ref(65);
</script>
<template>
  <div class="q-gutter-md">
    <q-circular-progress
      show-value
      :value="number"
      size="90px"
      :thickness="0.15"
      color="primary"
      track-color="grey-3"
      >{{ number }}%</q-circular-progress
    ><q-slider v-model="number" :min="0" :max="100" label />
  </div>
</template>
