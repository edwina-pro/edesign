<script setup lang="ts">
import { ref } from "vue";
const checked = ref(true);
</script>
<template>
  <div class="q-gutter-md">
    <q-chip color="purple-1" text-color="primary" icon="check">設計系統</q-chip
    ><q-chip v-model="checked" removable color="teal-1" text-color="teal"
      >可移除標籤</q-chip
    >
  </div>
</template>
