<script setup lang="ts">
import { ref } from "vue";
const checked = ref(true);
</script>
<template>
  <div class="q-gutter-md">
    <q-checkbox v-model="checked" label="接收更新通知" color="primary" />
  </div>
</template>
