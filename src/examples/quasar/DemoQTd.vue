<script setup lang="ts">
import { type QTableColumn } from "quasar";
const rows = [
  { id: 1, name: "陳怡安", role: "設計師" },
  { id: 2, name: "林冠宇", role: "工程師" },
];
const columns: QTableColumn[] = [
  { name: "name", field: "name", label: "姓名", align: "left", sortable: true },
  { name: "role", field: "role", label: "職務", align: "left" },
];
</script>
<template>
  <div class="q-gutter-md">
    <q-table
      title="團隊成員"
      :rows="rows"
      :columns="columns"
      row-key="id"
      flat
      :pagination="{ rowsPerPage: 5 }"
      ><template #header="props"
        ><q-tr :props="props"
          ><q-th v-for="col in props.cols" :key="col.name" :props="props">{{
            col.label
          }}</q-th></q-tr
        ></template
      ><template #body="props"
        ><q-tr :props="props"
          ><q-td v-for="col in props.cols" :key="col.name" :props="props">{{
            col.value
          }}</q-td></q-tr
        ></template
      ></q-table
    >
  </div>
</template>
