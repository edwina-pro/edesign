<script setup lang="ts">
import { computed, provide } from "vue";
import { themeKey, type ETheme } from "./material";
const props = withDefaults(defineProps<{ theme?: ETheme }>(), {
  theme: "native",
});
provide(
  themeKey,
  computed(() => props.theme),
);
</script>
<template>
  <div :data-e-theme="theme" class="e-theme-provider"><slot /></div>
</template>
