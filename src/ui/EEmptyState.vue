<script setup lang="ts">
import { useTheme, type ETheme } from "./material";
import { QIcon } from "quasar";
const themeProps = withDefaults(
  defineProps<{ theme?: ETheme; title?: string; description?: string }>(),
  {
    title: "目前還沒有資料",
    description: "新增第一筆資料，開始你的工作。",
  },
);
const resolvedTheme = useTheme(themeProps);
</script>
<template>
  <div :data-e-theme="resolvedTheme" class="empty-state">
    <QIcon name="inbox" size="42px" />
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <slot />
  </div>
</template>
