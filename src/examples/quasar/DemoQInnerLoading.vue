<script setup lang="ts">
import { ref } from "vue";
const checked = ref(true);
</script>
<template>
  <div class="q-gutter-md">
    <q-toggle v-model="checked" label="顯示載入遮罩" />
    <div class="relative-position glass q-pa-xl q-mt-md">
      內容區域<q-inner-loading :showing="checked" color="primary" />
    </div>
  </div>
</template>
