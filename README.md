# edesign — 原生、玻璃、甜美元件與原碼展示站

新版元件材質使用方式見 [THEMES.md](THEMES.md)。每個 E 元件可設定 theme，或透過 EThemeProvider 統一設定。展示站提供逐元件的三種主題比較，原生主題保留 Quasar 預設外觀。

你可以看 Demo、複製原碼、直接修改；也可以將共用元件安裝到其他 Vue 系統。

## 開啟 Demo

已安裝 Node.js 20.19+ 或 22.12+（本次使用 Node 24）。在此資料夾開終端機：

```powershell
npm ci
npm run dev
```

瀏覽器開啟 http://127.0.0.1:5188 。第一次已安裝依賴時，只需要 `npm run dev`。
也可雙擊「啟動Demo.cmd」；該視窗需保持開啟，Ctrl+C 可結束伺服器。

## 你會看到什麼

- 設計總覽：玻璃主題、常用元件、即時調整透明度 / 模糊 / 圓角 / 主色。
- 基礎元件：122 個元件與子元件 Demo、Vue 原碼、props / events / slots API。
- 組合元件：頁面、查詢、表格、表單視窗、狀態、空資料與版型。
- 完整頁面：客戶查詢、新增、編輯、刪除、驗證、分頁、排序及勾選。
- 原碼指南：直接讀取真實 `.vue`、`.ts`、`.css` 檔，可複製。

## 從哪裡改

```text
src/ui/theme.css             全站玻璃主題與樣式變數
src/ui/E*.vue                自有共用元件
src/ui/services.ts           通知與確認視窗
src/examples/quasar/*.vue    Quasar 元件與子元件範例
src/examples/CustomerPage.vue 完整 CRUD 頁面
src/examples/Buttons.vue     自有按鈕使用範例
src/examples/Inputs.vue      自有輸入框使用範例
src/App.vue                 展示站
src/data/inventory.json      套件提供的完整 API 盤點
src/data/catalog.json        可執行 Demo 清單
packages/ui/                可安裝的共用套件
```

複製 `src/examples` 裡的範例後，將資料與事件換成自己的即可。`E` 開頭元件須從共用元件庫匯入；`Q` 開頭元件需要 Quasar。

元件保留 Quasar 的 props / events / slots 介面；EButton 額外提供 primary、secondary、danger、ghost 外觀。EStatusBadge 的狀態為 active、pending、disabled。EDataTable 預設 row-key 為 id，可自行覆寫。

## 玻璃主題

在總覽右側調整後，按「複製主題設定」，貼回 `src/ui/theme.css` 的 `:root`。

```css
:root {
  --e-primary: #635bdf;
  --q-primary: #635bdf;
  --e-glass-opacity: 0.28;
  --e-blur: 18px;
  --e-radius: 18px;
}
```

玻璃效果需要背景才看得清楚。亮暗主題由展示站同步至 Quasar Dark；一般 / 緊湊模式透過 body 的 compact 類別控制。
滑桿設定目前不會自動寫回檔案，需透過複製設定保存。

## 在另一個 Vue 3 + Quasar 系統引用

先在 edesign 執行 `npm run build`，再到另一個專案安裝：

```powershell
npm install "C:/Users/edwin/company/Edwina/develop/self_test/edesign/packages/ui"
```

應用程式需先安裝並配置 Quasar（含其基礎 CSS、圖示與 Notify / Dialog plugins）。例如 Vite 專案：

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
export default defineConfig({
  plugins: [vue({ template: { transformAssetUrls } }), quasar()],
});
```

```ts
// main.ts
import { createApp } from "vue";
import { Quasar, Notify, Dialog } from "quasar";
import zhTW from "quasar/lang/zh-TW";
import "quasar/src/css/index.sass";
import "@quasar/extras/material-icons/material-icons.css";
import "@edwina/edesign/style.css";
import App from "./App.vue";
createApp(App)
  .use(Quasar, {
    lang: zhTW,
    plugins: { Notify, Dialog },
    config: { brand: { primary: "#635bdf" } },
  })
  .mount("#app");
```

```vue
<script setup lang="ts">
import { ref } from "vue";
import { EPage, EInput, EButton, notify } from "@edwina/edesign";
const name = ref("");
</script>
<template>
  <EPage title="我的系統">
    <EInput v-model="name" label="姓名" />
    <EButton @click="notify('已儲存')">儲存</EButton>
  </EPage>
</template>
```

`npm run pack:ui` 可產生 tarball 供其他系統安裝。套件附帶 TypeScript 宣告；尚未發佈至 npm。

## 完整涵蓋的定義

這一版針對已鎖定的 Quasar 2.35.2：

- 套件 API 中 123 筆 component entries，含 1 筆非視覺的 QFormChildMixin。
- 122 個視覺元件各有對應 Demo；子元件會在必要的父容器中展示。
- 部分子元件頁面採用相同組合範例，API 頁籤顯示各自的介面。
- 20 plugins 與 13 directives 完整收錄 API JSON，尚未逐一製作操作頁。
- 未複製或 fork Quasar 原始碼，也不宣稱涵蓋每個 prop 的所有排列組合。
- 表單 mixin 不需獨立視覺 Demo；Quasar composables / utils 不包含在這份 dist/api 目錄盤點中。
- QVideo 使用本機說明頁示意 iframe 容器；QUploader 只建立本機檔案佇列，皆須接上你自己的影片來源或上傳後端。
- 客戶資料為虛構展示資料，儲存在 localStorage，沒有後端、登入或跨裝置同步。

官方參考：https://quasar.dev/components/ 、 https://quasar.dev/start/vite-plugin/ 。
原碼依賴版本由 package-lock.json 鎖定。升級 Quasar 後執行 `npm run inventory` 更新盤點；手改 Demo 不會被這個指令覆蓋。`npm run demos:generate` 會重新生成 Quasar Demo，請先備份自己的修改。

## 建置與驗證

```powershell
npm run check       # TypeScript + Vue SFC 型別檢查
npm run build       # 展示站 dist/ + 共用套件 packages/ui/dist/ + 型別宣告
npm run inventory   # 從安裝的官方套件重建 API 清單
```

建議依序調整 tokens、基礎元件與組合元件，再於客戶管理範例驗證。版號與變更說明見 CHANGELOG.md。
