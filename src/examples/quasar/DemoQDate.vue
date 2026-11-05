<script setup lang="ts">
import { ref } from "vue";
const date = ref("2026/11/03");
</script>
<template>
  <div class="q-gutter-md"><q-date v-model="date" color="primary" /></div>
</template>
