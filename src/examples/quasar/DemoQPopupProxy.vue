<script setup lang="ts">
import { useTheme } from "../../ui/material";
const popupTheme = useTheme({});

import { ref } from "vue";
const date = ref("2026/11/03");
</script>
<template>
  <div class="q-gutter-md">
    <q-btn outline color="primary" label="選擇日期"
      ><q-popup-proxy :data-e-theme="popupTheme"
        ><q-date v-model="date" /></q-popup-proxy
    ></q-btn>
  </div>
</template>
