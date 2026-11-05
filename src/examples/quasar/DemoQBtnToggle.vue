<script setup lang="ts">
import { ref } from "vue";
const choice = ref("a");
const options = [
  { label: "一般方案", value: "a" },
  { label: "專業方案", value: "b" },
];
</script>
<template>
  <div class="q-gutter-md">
    <q-btn-toggle v-model="choice" toggle-color="primary" :options="options" />
  </div>
</template>
