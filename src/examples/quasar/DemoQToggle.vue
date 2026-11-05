<script setup lang="ts">
import { ref } from "vue";
const checked = ref(true);
</script>
<template>
  <div class="q-gutter-md">
    <q-toggle v-model="checked" label="啟用功能" color="primary" />
  </div>
</template>
