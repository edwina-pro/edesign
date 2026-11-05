<script setup lang="ts">
import { useTheme } from "../../ui/material";
const popupTheme = useTheme({});

import { ref } from "vue";
import { Notify } from "quasar";
const color = ref("#635bdf");
const notify = (message: string) =>
  Notify.create({ message, color: "primary" });
</script>
<template>
  <div class="q-gutter-md">
    <q-btn-dropdown
      :content-class="`e-theme-${popupTheme}`"
      color="primary"
      label="更多操作"
      ><q-list
        ><q-item clickable v-close-popup @click="notify('已選擇匯出')"
          ><q-item-section>匯出報表</q-item-section></q-item
        ><q-item clickable v-close-popup @click="notify('已選擇分享')"
          ><q-item-section>分享</q-item-section></q-item
        ></q-list
      ></q-btn-dropdown
    >
  </div>
</template>
