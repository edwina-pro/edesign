<script setup lang="ts">
import { useTheme } from "../../ui/material";
const popupTheme = useTheme({});

import { ref } from "vue";
const choice = ref("a");
const options = [
  { label: "一般方案", value: "a" },
  { label: "專業方案", value: "b" },
];
</script>
<template>
  <div class="q-gutter-md">
    <q-select
      :popup-content-class="`e-theme-${popupTheme}`"
      v-model="choice"
      :options="options"
      emit-value
      map-options
      outlined
      label="選擇方案"
    />
  </div>
</template>
