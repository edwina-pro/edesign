<script setup lang="ts">
import { useTheme } from "../../ui/material";
const popupTheme = useTheme({});

import { ref } from "vue";
const open = ref(false);
</script>
<template>
  <div class="q-gutter-md">
    <q-btn color="primary" label="開啟視窗" @click="open = true" /><q-dialog
      :data-e-theme="popupTheme"
      v-model="open"
      ><q-card class="q-pa-lg"
        ><h3>確認你的操作</h3>
        <p>這是一個使用共用玻璃主題的視窗。</p>
        <q-btn v-close-popup color="primary" label="完成" /></q-card
    ></q-dialog>
  </div>
</template>
