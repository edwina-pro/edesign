<script setup lang="ts">
import { ref } from "vue";
const split = ref(40);
</script>
<template>
  <div class="q-gutter-md">
    <q-splitter v-model="split" style="height: 160px"
      ><template #before><div class="q-pa-md">左側內容</div></template
      ><template #after
        ><div class="q-pa-md">右側內容 · 拖動分隔線</div></template
      ></q-splitter
    >
  </div>
</template>
