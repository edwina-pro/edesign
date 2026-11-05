<script setup lang="ts">
import { ref } from "vue";
const number = ref(65);
</script>
<template>
  <div class="q-gutter-md">
    <q-knob
      v-model="number"
      :min="0"
      :max="100"
      size="100px"
      color="primary"
      track-color="grey-3"
      show-value
    />
  </div>
</template>
