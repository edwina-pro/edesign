<script setup lang="ts">
import { useTheme, type ETheme } from "./material";
import { QTable, type QTableProps } from "quasar";
defineOptions({ inheritAttrs: false });
const themeProps = defineProps<{
  theme?: ETheme;
  rows: NonNullable<QTableProps["rows"]>;
  columns: NonNullable<QTableProps["columns"]>;
}>();
const resolvedTheme = useTheme(themeProps);
</script>
<template>
  <QTable
    :data-e-theme="resolvedTheme"
    row-key="id"
    v-bind="$attrs"
    :rows="rows"
    :columns="columns"
    flat
    class="glass e-table"
    :rows-per-page-options="[5, 10, 20]"
    no-data-label="沒有符合的資料"
    rows-per-page-label="每頁筆數"
    ><template v-for="(_, name) in $slots" #[name]="scope"
      ><slot :name="name" v-bind="scope || {}" /></template
  ></QTable>
</template>
