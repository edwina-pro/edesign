# 元件材質主題

每個自有 `E` 元件支援 `theme="native" | "glass" | "sweet"`，沒有設定時繼承最近的 EThemeProvider；沒有 provider 時採原生。

```vue
<script setup lang="ts">
import { EThemeProvider, EButton, EInput } from "@edwina/edesign";
import "@edwina/edesign/style.css";
import { ref } from "vue";
const name = ref("");
</script>
<template>
  <EThemeProvider theme="glass">
    <EInput v-model="name" label="姓名" />
    <EButton>玻璃按鈕</EButton>
    <EButton theme="sweet">甜美按鈕</EButton>
    <EButton theme="native">原生按鈕</EButton>
  </EThemeProvider>
</template>
```

原生保留 Quasar 的預設表面；玻璃套用透明度、模糊、高光與透色；甜美使用奶油粉色、柔和圓角與輕盈陰影。切換主題不會切換資料、events、slots 或業務邏輯。

材質位於 `src/ui/theme.css`，元件結構位於 `src/ui/base.css`，展示站框架位於 `src/studio.css`。共用套件不會匯入展示站背景或展示站版面 CSS。

## 每個元件的 Demo

打開「基礎元件」，選一個元件，再選「三種主題比較」，會顯示相同背景下的三份元件。每份都能獨立操作及複製包含 EThemeProvider 的 Vue 原碼。

沒有可見表面的工具元件（例如觀察器、空間和無 SSR 容器）保留原功能，不為了換材質加上多餘的裝飾。圖片、影片等內容本身也不會被替換成裝飾紋理。材質作用於適合的表面和控制項，不是對整頁套濾鏡。

## 彈出元件

自有 EFormDialog 在 teleport 後的卡片保留主題。Quasar 原始元件會在 teleport 後離開 provider 的 DOM，需把主題帶到彈出根節點：

```vue
<script setup lang="ts">
import { useTheme } from "@edwina/edesign";
const popupTheme = useTheme({});
</script>
<template>
  <q-btn label="開啟選單">
    <q-menu :data-e-theme="popupTheme">
      <q-list
        ><q-item><q-item-section>選單內容</q-item-section></q-item></q-list
      >
    </q-menu>
  </q-btn>
</template>
```

QSelect 可用 `:popup-content-class="'e-theme-' + popupTheme"`；QBtnDropdown 可用 `:content-class="'e-theme-' + popupTheme"`。展示站相關範例已包含這些設定。

深淺模式獨立於三種材質；使用 Quasar Dark 並在 body 加上 dark class 即可套用套件的深色材質。展示站已處理同步。

主題隔離使用 CSS `@scope`，請使用支援此功能的現代瀏覽器；目前已在本機 Chromium 預覽驗證。
