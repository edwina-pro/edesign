<script setup lang="ts">
import { ref } from "vue";
import { Notify } from "quasar";
const text = ref("");
const color = ref("#635bdf");
const notify = (message: string) =>
  Notify.create({ message, color: "primary" });
</script>
<template>
  <div class="q-gutter-md">
    <q-form @submit="notify('驗證成功')" class="q-gutter-md"
      ><q-input
        v-model="text"
        outlined
        label="必填名稱"
        :rules="[(v) => !!v || '請輸入名稱']" /><q-btn
        type="submit"
        color="primary"
        label="送出"
    /></q-form>
  </div>
</template>
