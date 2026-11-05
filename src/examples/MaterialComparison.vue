<script setup lang="ts">
import { ref } from "vue";
import {
  EThemeProvider,
  EButton,
  EInput,
  EStatusBadge,
  type ETheme,
} from "../ui";
const themes: { value: ETheme; label: string; description: string }[] = [
  { value: "native", label: "原生主題", description: "Quasar 預設外觀" },
  { value: "glass", label: "玻璃主題", description: "半透明、模糊、高光邊緣" },
  {
    value: "sweet",
    label: "甜美主題",
    description: "奶油粉、蜜桃色與柔和圓角",
  },
];
const names = ref({ native: "Edwin", glass: "Edwin", sweet: "Edwin" });
const checks = ref({ native: true, glass: true, sweet: true });
</script>
<template>
  <section>
    <div class="section-bar">
      <h2>相同元件，三種風格</h2>
      <small>背景相同，只改元件本身</small>
    </div>
    <div class="material-compare">
      <section v-for="item in themes" :key="item.value">
        <h3>
          {{ item.label }}
          <small style="font-weight: 400; color: var(--e-muted)">{{
            item.description
          }}</small>
        </h3>
        <div class="material-stage">
          <EThemeProvider :theme="item.value"
            ><div class="q-gutter-md">
              <div class="row q-gutter-sm">
                <EButton>主要按鈕</EButton
                ><EButton variant="secondary">次要按鈕</EButton>
              </div>
              <EInput v-model="names[item.value]" label="輸入欄位" /><q-card
                ><q-card-section
                  ><strong>卡片元件</strong>
                  <div class="q-mt-sm">
                    邊框、表面、陰影與反光跟著主題改變。
                  </div></q-card-section
                ></q-card
              >
              <div class="row items-center justify-between">
                <q-toggle
                  v-model="checks[item.value]"
                  label="啟用"
                /><EStatusBadge />
              </div></div
          ></EThemeProvider>
        </div>
      </section>
    </div>
  </section>
</template>
