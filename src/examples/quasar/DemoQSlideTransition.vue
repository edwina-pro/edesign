<script setup lang="ts">
import { ref } from "vue";
const checked = ref(true);
</script>
<template>
  <div class="q-gutter-md">
    <q-btn
      color="primary"
      label="切換內容"
      @click="checked = !checked"
    /><q-slide-transition
      ><div v-show="checked" class="glass q-pa-lg q-mt-md">
        展開與收合的動畫內容。
      </div></q-slide-transition
    >
  </div>
</template>
