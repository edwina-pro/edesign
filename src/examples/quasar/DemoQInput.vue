<script setup lang="ts">
import { ref } from "vue";
const text = ref("");
</script>
<template>
  <div class="q-gutter-md">
    <q-input v-model="text" outlined label="專案名稱" clearable /><q-input
      v-model="text"
      outlined
      label="唯讀欄位"
      readonly
    />
  </div>
</template>
