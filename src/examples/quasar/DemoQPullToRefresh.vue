<script setup lang="ts">
import { ref, onUnmounted } from "vue";
const refreshCount = ref(0);
const timers: ReturnType<typeof setTimeout>[] = [];
function refresh(done: () => void) {
  timers.push(
    setTimeout(() => {
      refreshCount.value++;
      done();
    }, 500),
  );
}
onUnmounted(() => timers.forEach(clearTimeout));
</script>
<template>
  <div class="q-gutter-md">
    <q-pull-to-refresh @refresh="refresh"
      ><div class="glass q-pa-xl">
        向下拖曳更新 · 已更新 {{ refreshCount }} 次
      </div></q-pull-to-refresh
    >
  </div>
</template>
