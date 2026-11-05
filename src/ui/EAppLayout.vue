<script setup lang="ts">
import { useTheme, type ETheme } from "./material";
import { ref } from "vue";
import { QBtn } from "quasar";
const open = ref(false);
const themeProps = defineProps<{ theme?: ETheme }>();
const resolvedTheme = useTheme(themeProps);
</script>
<template>
  <div :data-e-theme="resolvedTheme" class="app-layout">
    <QBtn
      class="mobile-menu"
      flat
      round
      icon="menu"
      aria-label="開啟選單"
      @click="open = !open"
    />
    <aside :class="['sidebar', { open }]" @click="open = false">
      <slot name="navigation" />
    </aside>
    <main class="main-area"><slot /></main>
  </div>
</template>
