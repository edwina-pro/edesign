<script setup lang="ts">
import { useTheme, type ETheme } from "./material";
const themeProps = withDefaults(
  defineProps<{ theme?: ETheme; status?: "active" | "pending" | "disabled" }>(),
  {
    status: "active",
  },
);
const labels = { active: "啟用中", pending: "待審核", disabled: "已停用" };
const resolvedTheme = useTheme(themeProps);
</script>
<template>
  <span
    :data-e-theme="resolvedTheme"
    :class="['e-status', `e-status--${status}`]"
    ><i />{{ labels[status] }}</span
  >
</template>
