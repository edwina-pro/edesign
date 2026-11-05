<script setup lang="ts">
import { ref } from "vue";
import { Notify } from "quasar";
const color = ref("#635bdf");
const notify = (message: string) =>
  Notify.create({ message, color: "primary" });
</script>
<template>
  <div class="q-gutter-md">
    <p>QCardSection 需搭配 QCard 使用，以下展示實際組合。</p>
    <q-card style="max-width: 360px"
      ><q-card-section
        ><div class="text-h6">玻璃卡片</div>
        <p>透明表面、細緻邊框，以及背景模糊。</p></q-card-section
      ><q-card-actions
        ><q-btn
          flat
          color="primary"
          label="了解更多"
          @click="notify('卡片操作')" /></q-card-actions
    ></q-card>
  </div>
</template>
