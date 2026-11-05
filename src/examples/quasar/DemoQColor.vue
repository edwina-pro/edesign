<script setup lang="ts">
import { ref } from "vue";
const color = ref("#635bdf");
</script>
<template>
  <div class="q-gutter-md">
    <q-color v-model="color" style="max-width: 320px" />
  </div>
</template>
