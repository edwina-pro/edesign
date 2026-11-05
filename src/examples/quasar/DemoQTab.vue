<script setup lang="ts">
import { ref } from "vue";
const tab = ref("overview");
</script>
<template>
  <div class="q-gutter-md">
    <p>QTab 需搭配 QTabs 使用，以下展示實際組合。</p>
    <q-tabs v-model="tab" active-color="primary"
      ><q-tab name="overview" label="總覽" /><q-tab
        name="settings"
        label="設定" /></q-tabs
    ><q-tab-panels v-model="tab" animated class="bg-transparent"
      ><q-tab-panel name="overview">專案總覽內容</q-tab-panel
      ><q-tab-panel name="settings">專案設定內容</q-tab-panel></q-tab-panels
    >
  </div>
</template>
