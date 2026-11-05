<script setup lang="ts">
import { EButton, notify } from "../ui";
</script>
<template>
  <div>
    <div class="row q-gutter-sm">
      <EButton icon="add" @click="notify('主要按鈕已點擊')">主要按鈕</EButton
      ><EButton variant="secondary" @click="notify('次要按鈕已點擊')"
        >次要按鈕</EButton
      ><EButton variant="ghost" @click="notify('文字按鈕已點擊')"
        >文字按鈕</EButton
      ><EButton
        variant="danger"
        icon="delete_outline"
        @click="notify('危險操作範例')"
        >刪除</EButton
      >
    </div>
    <div class="row q-gutter-sm q-mt-md">
      <EButton loading>載入中</EButton><EButton disable>停用狀態</EButton
      ><EButton size="sm" @click="notify('小尺寸按鈕')">小尺寸</EButton
      ><EButton
        round
        icon="favorite_border"
        aria-label="收藏"
        @click="notify('已收藏')"
      />
    </div>
  </div>
</template>
