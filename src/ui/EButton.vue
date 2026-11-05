<script setup lang="ts">
import { QBtn } from "quasar";
import { useTheme, type ETheme } from "./material";
defineOptions({ inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    theme?: ETheme;
    variant?: "primary" | "secondary" | "danger" | "ghost";
  }>(),
  { variant: "primary" },
);
const resolvedTheme = useTheme(props);
</script>
<template>
  <QBtn
    :data-e-theme="resolvedTheme"
    :color="
      variant === 'danger'
        ? 'negative'
        : variant === 'secondary'
          ? 'secondary'
          : variant === 'ghost'
            ? undefined
            : 'primary'
    "
    :flat="variant === 'ghost'"
    :outline="variant === 'secondary'"
    v-bind="$attrs"
    :class="['e-button', `e-button--${variant}`]"
    no-caps
    ><slot
  /></QBtn>
</template>
