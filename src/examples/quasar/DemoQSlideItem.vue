<script setup lang="ts">
import { ref } from "vue";
import { Notify } from "quasar";
const color = ref("#635bdf");
const notify = (message: string) =>
  Notify.create({ message, color: "primary" });
function slideAction({ reset }: { reset: () => void }) {
  notify("操作完成");
  reset();
}
</script>
<template>
  <div class="q-gutter-md">
    <q-slide-item @left="slideAction" @right="slideAction"
      ><template #left><q-icon name="done" /></template
      ><template #right><q-icon name="delete" /></template
      ><q-item class="glass"
        ><q-item-section>向左或向右拖曳這個項目</q-item-section></q-item
      ></q-slide-item
    >
  </div>
</template>
