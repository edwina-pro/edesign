<script setup lang="ts">
import { ref } from "vue";
const rating = ref(4);
</script>
<template>
  <div class="q-gutter-md">
    <q-rating v-model="rating" size="32px" color="amber" :max="5" />
  </div>
</template>
