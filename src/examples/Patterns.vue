<script setup lang="ts">
import { EPage, EButton, EStatusBadge, EEmptyState, notify } from "../ui";
</script>
<template>
  <EPage title="專案總覽" description="標題、操作、狀態與空資料的組合範例"
    ><template #actions
      ><EButton icon="add" @click="notify('你可以接上自己的新增流程')"
        >新增專案</EButton
      ></template
    >
    <div class="row q-gutter-sm">
      <EStatusBadge /><EStatusBadge status="pending" /><EStatusBadge
        status="disabled"
      />
    </div>
    <EEmptyState
      ><EButton variant="secondary" @click="notify('開始建立你的第一個專案')"
        >開始建立</EButton
      ></EEmptyState
    ></EPage
  >
</template>
