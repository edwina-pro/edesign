<script setup lang="ts">
import { ref } from "vue";
import { Notify } from "quasar";
const color = ref("#635bdf");
const notify = (message: string) =>
  Notify.create({ message, color: "primary" });
</script>
<template>
  <div class="q-gutter-md">
    <q-btn
      color="primary"
      label="主要按鈕"
      no-caps
      @click="notify('已點擊')"
    /><q-btn outline color="primary" label="外框按鈕" /><q-btn
      flat
      color="primary"
      label="文字按鈕"
    />
  </div>
</template>
