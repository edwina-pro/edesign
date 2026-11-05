<script setup lang="ts">
import { ref } from "vue";
const choice = ref("a");
</script>
<template>
  <div class="q-gutter-md">
    <q-radio v-model="choice" val="a" label="一般方案" /><q-radio
      v-model="choice"
      val="b"
      label="專業方案"
    />
  </div>
</template>
