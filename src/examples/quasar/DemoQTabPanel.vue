<script setup lang="ts">
import { ref } from "vue";
const tab = ref("overview");
</script>
<template>
  <div class="q-gutter-md">
    <p>QTabPanel 需搭配 QTabPanels 使用，以下展示實際組合。</p>
    <q-btn-toggle
      v-model="tab"
      :options="[
        { label: '總覽', value: 'overview' },
        { label: '設定', value: 'settings' },
      ]"
    /><q-tab-panels v-model="tab" animated class="bg-transparent"
      ><q-tab-panel name="overview">這是總覽內容。</q-tab-panel
      ><q-tab-panel name="settings">這是設定內容。</q-tab-panel></q-tab-panels
    >
  </div>
</template>
