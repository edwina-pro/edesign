<script setup lang="ts">
const longItems = Array.from({ length: 1000 }, (_, i) => "資料項目 " + (i + 1));
</script>
<template>
  <div class="q-gutter-md">
    <q-virtual-scroll
      :items="longItems"
      style="max-height: 240px"
      v-slot="{ item, index }"
      ><q-item :key="index"
        ><q-item-section>{{ item }}</q-item-section></q-item
      ></q-virtual-scroll
    >
  </div>
</template>
