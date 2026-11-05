<script setup lang="ts">
const nodes = [
  {
    label: "edesign",
    children: [
      { label: "基礎元件" },
      { label: "組合元件", children: [{ label: "客戶管理" }] },
    ],
  },
];
</script>
<template>
  <div class="q-gutter-md">
    <q-tree :nodes="nodes" node-key="label" default-expand-all />
  </div>
</template>
