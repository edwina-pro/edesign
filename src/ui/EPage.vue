<script setup lang="ts">
import { useTheme, type ETheme } from "./material";
const themeProps = defineProps<{
  theme?: ETheme;
  title: string;
  description?: string;
}>();
const resolvedTheme = useTheme(themeProps);
</script>
<template>
  <section :data-e-theme="resolvedTheme" class="e-page">
    <header class="page-heading">
      <div>
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
      <div class="row q-gutter-sm"><slot name="actions" /></div>
    </header>
    <slot />
  </section>
</template>
