<script setup lang="ts">
import { ref } from "vue";
import { Notify } from "quasar";
const color = ref("#635bdf");
const items = ["專案總覽", "成員管理", "系統設定"];
const notify = (message: string) =>
  Notify.create({ message, color: "primary" });
</script>
<template>
  <div class="q-gutter-md">
    <p>QItem 需搭配 QList 使用，以下展示實際組合。</p>
    <q-list bordered separator class="rounded-borders"
      ><q-item v-for="item in items" :key="item" clickable @click="notify(item)"
        ><q-item-section avatar
          ><q-icon name="folder_open" color="primary" /></q-item-section
        ><q-item-section>{{ item }}</q-item-section
        ><q-item-section side
          ><q-icon name="chevron_right" /></q-item-section></q-item
    ></q-list>
  </div>
</template>
