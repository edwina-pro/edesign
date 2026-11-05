<script setup lang="ts">
import { ref } from "vue";
const file = ref<File | null>(null);
</script>
<template>
  <div class="q-gutter-md">
    <q-file v-model="file" outlined label="選擇檔案" counter clearable
      ><template #prepend><q-icon name="attach_file" /></template
    ></q-file>
  </div>
</template>
