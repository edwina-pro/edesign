<script setup lang="ts">
import { ref } from "vue";
import { EInput } from "../ui";
const name = ref(""),
  email = ref("hello@edesign.dev"),
  password = ref(""),
  count = ref(1);
</script>
<template>
  <div class="q-gutter-md">
    <EInput v-model="name" label="你的姓名" clearable /><EInput
      v-model="email"
      label="電子郵件"
      type="email"
    /><EInput v-model="password" type="password" label="密碼" /><EInput
      v-model="count"
      type="number"
      label="數量"
    /><EInput model-value="此欄位為唯讀" label="唯讀" readonly /><EInput
      model-value=""
      label="驗證錯誤"
      error
      error-message="請填寫必要資訊"
    />
  </div>
</template>
