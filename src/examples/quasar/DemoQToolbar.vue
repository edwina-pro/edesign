<script setup lang="ts">
import { ref } from "vue";
import { Notify } from "quasar";
const color = ref("#635bdf");
const notify = (message: string) =>
  Notify.create({ message, color: "primary" });
</script>
<template>
  <div class="q-gutter-md">
    <q-toolbar class="glass"
      ><q-btn
        flat
        round
        icon="menu"
        aria-label="選單"
        @click="notify('選單')" /><q-toolbar-title>應用程式</q-toolbar-title
      ><q-btn
        flat
        round
        icon="notifications_none"
        aria-label="通知"
        @click="notify('沒有新的通知')"
    /></q-toolbar>
  </div>
</template>
