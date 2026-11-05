<script setup lang="ts">
import { ref } from "vue";
const checked = ref(true);
const items = ["專案總覽", "成員管理", "系統設定"];
</script>
<template>
  <div class="q-gutter-md">
    <q-layout container style="height: 250px"
      ><q-drawer v-model="checked" :width="150" bordered
        ><q-list
          ><q-item v-for="item in items" :key="item"
            ><q-item-section>{{ item }}</q-item-section></q-item
          ></q-list
        ></q-drawer
      ><q-page-container
        ><q-page padding
          ><q-btn
            color="primary"
            label="切換側欄"
            @click="checked = !checked" /></q-page></q-page-container
    ></q-layout>
  </div>
</template>
