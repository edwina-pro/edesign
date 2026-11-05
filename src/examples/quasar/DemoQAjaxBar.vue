<script setup lang="ts">
import { ref, onUnmounted } from "vue";
const bar = ref<{ start: () => void; stop: () => void } | null>(null);
const timers: ReturnType<typeof setTimeout>[] = [];
function runBar() {
  bar.value?.start();
  timers.push(setTimeout(() => bar.value?.stop(), 1200));
}
onUnmounted(() => timers.forEach(clearTimeout));
</script>
<template>
  <div class="q-gutter-md">
    <q-btn color="primary" label="模擬請求" @click="runBar" /><q-ajax-bar
      ref="bar"
      position="top"
      color="primary"
      size="4px"
      skip-hijack
    />
  </div>
</template>
