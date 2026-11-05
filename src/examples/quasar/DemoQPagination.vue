<script setup lang="ts">
import { ref } from "vue";
const page = ref(1);
</script>
<template>
  <div class="q-gutter-md">
    <q-pagination
      v-model="page"
      :max="10"
      :max-pages="5"
      direction-links
      color="primary"
    />
  </div>
</template>
