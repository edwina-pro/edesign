<script setup lang="ts">
import { ref, onUnmounted } from "vue";
const number = ref(65);
const loaded = ref(10);
const timers: ReturnType<typeof setTimeout>[] = [];
function loadMore(_index: number, done: (stop?: boolean) => void) {
  timers.push(
    setTimeout(() => {
      loaded.value += 5;
      done(loaded.value >= 30);
    }, 350),
  );
}
onUnmounted(() => timers.forEach(clearTimeout));
</script>
<template>
  <div class="q-gutter-md">
    <div style="max-height: 220px; overflow: auto">
      <q-infinite-scroll @load="loadMore" :offset="50" :disable="loaded >= 30"
        ><div v-for="n in loaded" :key="n" class="q-pa-sm">資料 {{ n }}</div>
        <template #loading><q-spinner color="primary" /></template
      ></q-infinite-scroll>
    </div>
    <p>本機示範最多載入 30 筆。</p>
  </div>
</template>
