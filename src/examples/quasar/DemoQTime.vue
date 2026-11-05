<script setup lang="ts">
import { ref } from "vue";
const time = ref("14:30");
</script>
<template>
  <div class="q-gutter-md">
    <q-time v-model="time" color="primary" format24h />
  </div>
</template>
