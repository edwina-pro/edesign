<script setup lang="ts">
import { useTheme, type ETheme } from "./material";
import { QInput } from "quasar";
defineOptions({ inheritAttrs: false });
const model = defineModel<string | number | null>();
const themeProps = defineProps<{ theme?: ETheme }>();
const resolvedTheme = useTheme(themeProps);
</script>
<template>
  <QInput
    :data-e-theme="resolvedTheme"
    v-bind="$attrs"
    v-model="model"
    outlined
    class="e-input"
    ><template v-for="(_, name) in $slots" #[name]="scope"
      ><slot :name="name" v-bind="scope || {}" /></template
  ></QInput>
</template>
