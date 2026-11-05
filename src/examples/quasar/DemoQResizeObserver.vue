<script setup lang="ts">
import { ref } from "vue";
const width = ref(280);
</script>
<template>
  <div class="q-gutter-md">
    <div
      style="
        resize: horizontal;
        overflow: auto;
        min-width: 150px;
        max-width: 100%;
        width: 280px;
      "
      class="glass q-pa-lg relative-position"
    >
      <q-resize-observer @resize="width = $event.width" />拖曳右下角調整寬度
    </div>
    <p>寬度：{{ width }} px</p>
  </div>
</template>
