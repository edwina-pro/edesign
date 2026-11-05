<script setup lang="ts">
import { ref } from "vue";
const html = ref("<b>歡迎使用 edesign</b>");
</script>
<template>
  <div class="q-gutter-md"><q-editor v-model="html" min-height="150px" /></div>
</template>
