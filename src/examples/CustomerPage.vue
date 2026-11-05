<script setup lang="ts">
import { computed, ref } from "vue";
import { QBtn, QSelect, type QTableColumn } from "quasar";
import {
  EPage,
  ESearchForm,
  EDataTable,
  EFormDialog,
  EInput,
  EButton,
  EStatusBadge,
  EEmptyState,
  notify,
  confirm,
} from "../ui";
type Customer = {
  id: number;
  name: string;
  email: string;
  department: string;
  status: "active" | "pending" | "disabled";
};
const storageKey = "edesign.customers.v1";
const initial: Customer[] = [
  {
    id: 1,
    name: "陳怡安",
    email: "yian@edwina.design",
    department: "產品設計",
    status: "active",
  },
  {
    id: 2,
    name: "林冠宇",
    email: "kuanyu@edwina.design",
    department: "技術研發",
    status: "active",
  },
  {
    id: 3,
    name: "王子晴",
    email: "ching@edwina.design",
    department: "品牌行銷",
    status: "pending",
  },
  {
    id: 4,
    name: "張宇軒",
    email: "yuhsuan@edwina.design",
    department: "營運管理",
    status: "disabled",
  },
  {
    id: 5,
    name: "李佳穎",
    email: "chiaying@edwina.design",
    department: "產品設計",
    status: "active",
  },
  {
    id: 6,
    name: "黃柏翰",
    email: "pohan@edwina.design",
    department: "技術研發",
    status: "pending",
  },
];
function load(): Customer[] {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || "null");
    return Array.isArray(value) &&
      value.every(
        (v) =>
          typeof v.id === "number" &&
          typeof v.name === "string" &&
          typeof v.email === "string" &&
          typeof v.department === "string" &&
          ["active", "pending", "disabled"].includes(v.status),
      )
      ? value
      : initial;
  } catch {
    return initial;
  }
}
const rows = ref<Customer[]>(load()),
  keyword = ref(""),
  status = ref<string | null>(null),
  applied = ref({ keyword: "", status: null as string | null }),
  selected = ref<Customer[]>([]),
  open = ref(false),
  saving = ref(false);
const blank = (): Customer => ({
  id: 0,
  name: "",
  email: "",
  department: "產品設計",
  status: "active",
});
const form = ref<Customer>(blank());
const options = [
  { label: "啟用中", value: "active" },
  { label: "待審核", value: "pending" },
  { label: "已停用", value: "disabled" },
];
const columns: QTableColumn[] = [
  {
    name: "name",
    label: "客戶姓名",
    field: "name",
    align: "left",
    sortable: true,
  },
  { name: "email", label: "電子郵件", field: "email", align: "left" },
  {
    name: "department",
    label: "部門",
    field: "department",
    align: "left",
    sortable: true,
  },
  { name: "status", label: "狀態", field: "status", align: "left" },
  { name: "actions", label: "操作", field: "id", align: "right" },
];
const filtered = computed(() =>
  rows.value.filter(
    (row) =>
      (!applied.value.keyword ||
        `${row.name} ${row.email} ${row.department}`
          .toLowerCase()
          .includes(applied.value.keyword.toLowerCase())) &&
      (!applied.value.status || row.status === applied.value.status),
  ),
);
function search() {
  applied.value = { keyword: keyword.value.trim(), status: status.value };
  selected.value = [];
}
function reset() {
  keyword.value = "";
  status.value = null;
  search();
}
function edit(row?: Customer) {
  form.value = row ? { ...row } : blank();
  open.value = true;
}
function persist() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(rows.value));
  } catch {
    notify("瀏覽器無法保存資料，這次修改只保留在目前畫面。");
  }
}
function save() {
  saving.value = true;
  const record = { ...form.value };
  if (record.id) {
    rows.value = rows.value.map((row) => (row.id === record.id ? record : row));
  } else {
    record.id = Math.max(0, ...rows.value.map((r) => r.id)) + 1;
    rows.value.unshift(record);
  }
  persist();
  saving.value = false;
  open.value = false;
  notify("客戶資料已儲存");
}
async function remove(row: Customer) {
  if (await confirm(`確定刪除「${row.name}」？`)) {
    rows.value = rows.value.filter((r) => r.id !== row.id);
    selected.value = selected.value.filter((r) => r.id !== row.id);
    persist();
    notify("已刪除客戶");
  }
}
</script>
<template>
  <EPage
    title="客戶管理"
    description="共用頁面範例 · 查詢、新增、編輯及刪除；資料僅存於此瀏覽器。"
    ><template #actions
      ><EButton icon="add" @click="edit()">新增客戶</EButton></template
    >
    <ESearchForm @search="search" @reset="reset"
      ><EInput
        v-model="keyword"
        label="搜尋姓名、Email 或部門"
        clearable
        @clear="keyword = ''" /><QSelect
        v-model="status"
        :options="options"
        emit-value
        map-options
        outlined
        clearable
        label="所有狀態"
    /></ESearchForm>
    <EDataTable
      v-model:selected="selected"
      selection="multiple"
      :rows="filtered"
      :columns="columns"
      :pagination="{ rowsPerPage: 5 }"
      title="客戶列表"
      ><template #body-cell-status="props"
        ><td><EStatusBadge :status="props.row.status" /></td></template
      ><template #body-cell-actions="props"
        ><td class="text-right">
          <QBtn
            flat
            round
            size="sm"
            icon="edit"
            aria-label="編輯客戶"
            @click="edit(props.row)"
          /><QBtn
            flat
            round
            size="sm"
            icon="delete_outline"
            aria-label="刪除客戶"
            @click="remove(props.row)"
          /></td></template
      ><template #no-data
        ><EEmptyState
          title="沒有符合的客戶"
          description="試著調整查詢條件，或新增一筆客戶資料。" /></template
    ></EDataTable>
    <EFormDialog
      v-model="open"
      :title="form.id ? '編輯客戶' : '新增客戶'"
      :loading="saving"
      @submit="save"
      ><EInput
        v-model="form.name"
        label="客戶姓名"
        :rules="[
          (v: unknown) => !!String(v || '').trim() || '請輸入姓名',
        ]" /><EInput
        v-model="form.email"
        label="電子郵件"
        type="email"
        :rules="[
          (v: unknown) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '')) ||
            '請輸入有效的 Email',
        ]" /><QSelect
        v-model="form.department"
        :options="['產品設計', '技術研發', '品牌行銷', '營運管理']"
        label="部門"
        outlined /><QSelect
        v-model="form.status"
        :options="options"
        emit-value
        map-options
        label="狀態"
        outlined
    /></EFormDialog>
  </EPage>
</template>
