<script setup lang="ts">
import { useTheme } from "../../ui/material";
const popupTheme = useTheme({});

import { ref } from "vue";
import { Notify } from "quasar";
const color = ref("#635bdf");
const items = ["專案總覽", "成員管理", "系統設定"];
const notify = (message: string) =>
  Notify.create({ message, color: "primary" });
</script>
<template>
  <div class="q-gutter-md">
    <q-btn color="primary" label="開啟選單"
      ><q-menu :data-e-theme="popupTheme"
        ><q-list style="min-width: 180px"
          ><q-item
            v-for="item in items"
            :key="item"
            clickable
            v-close-popup
            @click="notify(item)"
            ><q-item-section>{{ item }}</q-item-section></q-item
          ></q-list
        ></q-menu
      ></q-btn
    >
  </div>
</template>
