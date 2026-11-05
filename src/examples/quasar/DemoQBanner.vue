<script setup lang="ts">
import { ref } from "vue";
import { Notify } from "quasar";
const color = ref("#635bdf");
const notify = (message: string) =>
  Notify.create({ message, color: "primary" });
</script>
<template>
  <div class="q-gutter-md">
    <q-banner rounded class="bg-purple-1 text-primary"
      ><template #avatar><q-icon name="info" /></template
      >你的元件庫已準備就緒。<template #action
        ><q-btn flat label="知道了" @click="notify('已確認')" /></template
    ></q-banner>
  </div>
</template>
