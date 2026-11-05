<script setup lang="ts">
import { ref } from "vue";
const scrollPosition = ref(0);
</script>
<template>
  <div class="q-gutter-md">
    <div style="height: 180px; overflow: auto" class="relative-position">
      <q-scroll-observer @scroll="scrollPosition = $event.position.top" />
      <div style="height: 600px" class="q-pa-md">捲動這個區塊</div>
    </div>
    <p>垂直位置：{{ scrollPosition }} px</p>
  </div>
</template>
