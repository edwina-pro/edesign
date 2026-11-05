<script setup lang="ts">
import { ref } from "vue";
const text = ref("");
</script>
<template>
  <div class="q-gutter-md">
    <span class="cursor-pointer text-primary"
      >{{ text || "點擊編輯名稱"
      }}<q-popup-edit
        v-model="text"
        v-slot="scope"
        buttons
        label-set="儲存"
        label-cancel="取消"
        ><q-input
          v-model="scope.value"
          dense
          autofocus
          @keyup.enter="scope.set" /></q-popup-edit
    ></span>
  </div>
</template>
