<script setup lang="ts">
import { useTheme } from "../../ui/material";
const popupTheme = useTheme({});
</script>
<template>
  <div class="q-gutter-md">
    <q-btn color="primary" label="滑鼠移到這裡"
      ><q-tooltip :data-e-theme="popupTheme"
        >統一風格的操作提示</q-tooltip
      ></q-btn
    >
  </div>
</template>
