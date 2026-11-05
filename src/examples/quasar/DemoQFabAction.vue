<script setup lang="ts">
import { ref } from "vue";
import { Notify } from "quasar";
const color = ref("#635bdf");
const notify = (message: string) =>
  Notify.create({ message, color: "primary" });
</script>
<template>
  <div class="q-gutter-md">
    <p>QFabAction 需搭配 QFab 使用，以下展示實際組合。</p>
    <q-fab color="primary" icon="add" direction="right"
      ><q-fab-action
        color="secondary"
        icon="edit"
        @click="notify('編輯')" /><q-fab-action
        color="primary"
        icon="mail"
        @click="notify('郵件')"
    /></q-fab>
  </div>
</template>
