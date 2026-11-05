<script setup lang="ts">
import { computed, ref, watch, defineAsyncComponent } from "vue";
import { copyToClipboard, Dark, type QTableColumn } from "quasar";
import {
  EAppLayout,
  EThemeProvider,
  type ETheme,
  EButton,
  EInput,
  EDataTable,
  EStatusBadge,
  EEmptyState,
  notify,
} from "./ui";
import MaterialComparison from "./examples/MaterialComparison.vue";
import Buttons from "./examples/Buttons.vue";
import CustomerPage from "./examples/CustomerPage.vue";
import inventory from "./data/inventory.json";
import catalog from "./data/catalog.json";
import version from "./data/version.json";
const sources = import.meta.glob("./examples/**/*.vue", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const uiSources = import.meta.glob("./ui/*.{vue,ts,css}", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const loaders = import.meta.glob([
  "./examples/**/*.vue",
  "!./examples/Buttons.vue",
  "!./examples/CustomerPage.vue",
]);
const demos = Object.fromEntries(
  Object.entries(loaders).map(([path, loader]) => [
    path,
    defineAsyncComponent(loader as any),
  ]),
);
const material = ref<ETheme>("glass");
const materialOptions: { value: ETheme; label: string }[] = [
  { value: "native", label: "原生主題" },
  { value: "glass", label: "玻璃主題" },
  { value: "sweet", label: "甜美主題" },
];
watch(
  material,
  (value) => {
    document.body.dataset.eTheme = value;
  },
  { immediate: true },
);
function themedCode(code: string, theme: ETheme) {
  code = code.replace(
    /from ['"]\.\.\/\.\.\/ui\/material['"]/g,
    "from '@edwina/edesign'",
  );
  const statement = "import { EThemeProvider } from '@edwina/edesign';";
  const withImport = code.includes('<script setup lang="ts">')
    ? code.replace(
        '<script setup lang="ts">',
        '<script setup lang="ts">\n' + statement,
      )
    : '<script setup lang="ts">\n' + statement + "\n<" + "/script>\n" + code;
  return withImport
    .replace("<template>", '<template>\n<EThemeProvider theme="' + theme + '">')
    .replace(/<\/template>\s*$/, "</EThemeProvider>\n</template>");
}
const page = ref(location.hash.slice(1) || "overview"),
  query = ref(""),
  category = ref("全部"),
  selected = ref("QBtn"),
  showSource = ref(false),
  sourceFile = ref("EButton.vue"),
  detailTab = ref("demo"),
  dark = ref(false),
  compact = ref(false),
  primary = ref("#635bdf"),
  opacity = ref(28),
  blur = ref(18),
  radius = ref(18),
  name = ref(""),
  department = ref("產品設計"),
  enabled = ref(true),
  notifications = ref(false);
const nav = [
  { id: "overview", label: "設計總覽", icon: "space_dashboard" },
  { id: "components", label: "基礎元件", icon: "widgets" },
  { id: "patterns", label: "組合元件", icon: "view_quilt" },
  { id: "customers", label: "完整頁面範例", icon: "web" },
  { id: "source", label: "原碼與使用指南", icon: "code" },
];
watch(page, (value) => {
  location.hash = value;
  showSource.value = false;
});
window.addEventListener(
  "hashchange",
  () => (page.value = location.hash.slice(1) || "overview"),
);
watch([dark, compact], () => {
  Dark.set(dark.value);
  document.body.classList.toggle("dark", dark.value);
  document.body.classList.toggle("compact", compact.value);
});
watch([primary, opacity, blur, radius], () => {
  const s = document.documentElement.style;
  s.setProperty("--e-primary", primary.value);
  s.setProperty("--q-primary", primary.value);
  s.setProperty("--e-glass-opacity", String(opacity.value / 100));
  s.setProperty("--e-blur", `${blur.value}px`);
  s.setProperty("--e-radius", `${radius.value}px`);
});
const components = inventory.filter((i) => i.type === "component");
const categories = ["全部", ...new Set(catalog.map((i) => i.category))];
const visible = computed(() =>
  catalog.filter(
    (i) =>
      (category.value === "全部" || i.category === category.value) &&
      `${i.name} ${i.label}`.toLowerCase().includes(query.value.toLowerCase()),
  ),
);
const current = computed(
  () => catalog.find((i) => i.name === selected.value) || catalog[0],
);
const api = computed(() =>
  inventory.find((i) => i.name === current.value.name),
);
const currentCode = computed(() =>
  themedCode(sources[`./examples/${current.value.file}`] || "", material.value),
);
const parentNames = new Set(catalog.map((i) => i.name));
const related = computed(() =>
  components.filter((i) => !parentNames.has(i.name)),
);
const stats = [
  { icon: "widgets", label: "Quasar 元件 API", value: components.length },
  { icon: "code", label: "可執行元件 Demo", value: catalog.length },
  { icon: "view_quilt", label: "自有共用元件", value: 10 },
  { icon: "palette", label: "元件風格主題", value: "03" },
];
const previewRows = [
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
];
const columns: QTableColumn[] = [
  { name: "name", field: "name", label: "成員姓名", align: "left" },
  { name: "email", field: "email", label: "電子郵件", align: "left" },
  { name: "department", field: "department", label: "部門", align: "left" },
  { name: "status", field: "status", label: "狀態", align: "left" },
];
const exampleFiles = Object.keys(sources).map((path) =>
  path.replace("./examples/", ""),
);
const libraryFiles = Object.keys(uiSources).map((path) =>
  path.replace("./ui/", ""),
);
const fileCode = computed(
  () =>
    uiSources[`./ui/${sourceFile.value}`] ||
    sources[`./examples/${sourceFile.value}`] ||
    "",
);
const tokensCode = computed(
  () =>
    `/* 元件風格：${material.value}；用 EThemeProvider theme="${material.value}" 套用 */\n:root {\n  --e-primary: ${primary.value};\n  --q-primary: ${primary.value};\n  --e-glass-opacity: ${opacity.value / 100};\n  --e-blur: ${blur.value}px;\n  --e-radius: ${radius.value}px;\n}`,
);
async function copy(code: string) {
  try {
    await copyToClipboard(code);
    notify("原碼已複製");
  } catch {
    notify("無法使用剪貼簿，請選取原碼手動複製");
  }
}
function resetTheme() {
  primary.value = "#635bdf";
  opacity.value = 28;
  blur.value = 18;
  radius.value = 18;
  dark.value = false;
  compact.value = false;
}
function select(name: string) {
  selected.value = name;
  detailTab.value = "demo";
}
function showFile(file: string) {
  sourceFile.value = file;
  page.value = "source";
}
</script>
<template>
  <EThemeProvider :theme="material"
    ><EAppLayout
      ><template #navigation
        ><a href="#overview" class="brand" @click="page = 'overview'"
          ><span class="brand-mark">e</span>edesign<small>UI KIT</small></a
        >
        <div class="sidebar-caption">WORKSPACE</div>
        <button
          v-for="item in nav"
          :key="item.id"
          :class="['nav-item', { active: page === item.id }]"
          @click="page = item.id"
        >
          <q-icon :name="item.icon" /><span>{{ item.label }}</span
          ><span v-if="item.id === 'components'">{{ catalog.length }}</span>
        </button>
        <div class="sidebar-caption">DESIGN FOUNDATION</div>
        <button class="nav-item" @click="page = 'overview'">
          <q-icon name="blur_on" /><span>元件風格比較</span
          ><span>↗</span></button
        ><button class="nav-item" @click="showFile('theme.css')">
          <q-icon name="tune" /><span>Design Tokens</span><span>↗</span>
        </button>
        <div class="sidebar-bottom">
          <div class="glass q-pa-md">
            <div style="font-size: 12px; font-weight: 600">
              你的下一個系統，從這裡開始。
            </div>
            <p style="font-size: 10px; margin: 6px 0 0">
              看效果 · 複製原碼 · 自己開發
            </p>
          </div>
          <div class="version">
            edesign v0.2.0 <span style="float: right">Vue 3 + Quasar</span>
          </div>
        </div></template
      >
      <header class="topbar">
        <div>
          Workspace <span class="q-mx-sm">/</span>
          <b>{{ nav.find((n) => n.id === page)?.label }}</b>
        </div>
        <div class="top-actions">
          <span style="font-size: 10px">QUASAR {{ version.quasar }}</span
          ><q-btn
            flat
            round
            size="sm"
            :icon="dark ? 'light_mode' : 'dark_mode'"
            aria-label="切換深淺主題"
            @click="dark = !dark"
          />
          <div class="avatar">E</div>
        </div>
      </header>
      <section class="theme-toolbar">
        <div>
          <strong>元件風格主題</strong>
          <p>切換按鈕、輸入框、卡片、表格等元件的外觀風格。</p>
        </div>
        <div class="theme-options">
          <button
            v-for="item in materialOptions"
            :key="item.value"
            :class="['theme-option', { active: material === item.value }]"
            :aria-pressed="material === item.value"
            @click="material = item.value"
          >
            {{ item.label }}
          </button>
        </div>
      </section>
      <MaterialComparison v-if="page === 'overview'" />
      <template v-if="page === 'overview'"
        ><section class="hero">
          <div>
            <span class="eyebrow">YOUR DESIGN, YOUR COMPONENTS.</span>
            <h1>同一個元件，<em>三種風格。</em></h1>
            <p>
              以 Quasar 為基礎，每個元件都能套用原生、玻璃或甜美主題。<br />每個效果都有原碼，從一顆按鈕到完整系統，直接開始。
            </p>
          </div>
          <div class="hero-art" aria-hidden="true"><i /><i /><i>e</i></div>
        </section>
        <div class="stats">
          <div v-for="stat in stats" :key="stat.label" class="glass stat">
            <q-icon :name="stat.icon" />
            <div>
              <strong>{{ stat.value }}</strong
              ><small>{{ stat.label }}</small>
            </div>
          </div>
        </div>
        <div class="section-bar">
          <h2>
            元件工作台
            <span
              style="
                font-size: 11px;
                font-weight: 400;
                color: #9c9fb3;
                margin-left: 8px;
              "
              >Component playground</span
            >
          </h2>
          <small>LIVE PREVIEW <span style="color: #54b698">●</span></small>
        </div>
        <div class="workspace-grid">
          <div>
            <section class="glass showcase">
              <div class="panel-head">
                <h3>按鈕 <small class="q-ml-sm">Buttons</small></h3>
                <button class="code-toggle" @click="showSource = !showSource">
                  {{ showSource ? "收起原碼" : "〈/〉 查看原碼" }}
                </button>
              </div>
              <Buttons /><template v-if="showSource"
                ><div class="row justify-end q-mt-md">
                  <q-btn
                    flat
                    size="sm"
                    label="複製"
                    icon="content_copy"
                    @click="copy(sources['./examples/Buttons.vue'])"
                  />
                </div>
                <pre class="source">{{
                  sources["./examples/Buttons.vue"]
                }}</pre>
              </template>
            </section>
            <div class="component-pair">
              <section class="glass showcase">
                <div class="panel-head">
                  <h3>輸入欄位 <small class="q-ml-sm">Form inputs</small></h3>
                  <button class="code-toggle" @click="showFile('Inputs.vue')">
                    〈/〉
                  </button>
                </div>
                <div class="q-gutter-md">
                  <EInput v-model="name" label="輸入你的姓名" /><q-select
                    v-model="department"
                    :options="['產品設計', '技術研發', '品牌行銷']"
                    label="選擇部門"
                    outlined
                  />
                </div>
              </section>
              <section class="glass showcase">
                <div class="panel-head">
                  <h3>選取與狀態 <small class="q-ml-sm">Selections</small></h3>
                  <button
                    class="code-toggle"
                    @click="showFile('EStatusBadge.vue')"
                  >
                    〈/〉
                  </button>
                </div>
                <q-toggle v-model="enabled" label="啟用功能" /><br /><q-checkbox
                  v-model="notifications"
                  label="接收更新通知"
                />
                <div class="row q-gutter-sm q-mt-md">
                  <EStatusBadge /><EStatusBadge status="pending" /><EStatusBadge
                    status="disabled"
                  />
                </div>
              </section>
            </div>
            <section class="q-mt-lg">
              <div class="panel-head">
                <h3>資料表格 <small class="q-ml-sm">Data table</small></h3>
                <button class="code-toggle" @click="page = 'customers'">
                  開啟完整範例 ↗
                </button>
              </div>
              <EDataTable :rows="previewRows" :columns="columns" hide-bottom
                ><template #body-cell-status="props"
                  ><td>
                    <EStatusBadge :status="props.row.status" /></td></template
              ></EDataTable>
            </section>
          </div>
          <aside class="glass theme-panel">
            <h3><q-icon name="tune" class="q-mr-sm" />外觀參數</h3>
            <p>調整一次，所有元件一起改變。</p>
            <div class="theme-label">
              品牌主色 <span>{{ primary }}</span>
            </div>
            <div class="swatches">
              <button
                v-for="color in [
                  '#635bdf',
                  '#208e85',
                  '#3c82d9',
                  '#cb6b8d',
                  '#384257',
                ]"
                :key="color"
                :class="['swatch', { selected: primary === color }]"
                :style="{ background: color }"
                :aria-label="`主色 ${color}`"
                @click="primary = color"
              />
            </div>
            <div class="theme-label">
              玻璃不透明度 <span>{{ opacity }}%</span>
            </div>
            <q-slider
              v-model="opacity"
              :min="20"
              :max="95"
              label
              aria-label="玻璃不透明度"
            />
            <div class="theme-label">
              背景模糊 <span>{{ blur }}px</span>
            </div>
            <q-slider
              v-model="blur"
              :min="0"
              :max="40"
              label
              aria-label="背景模糊"
            />
            <div class="theme-label">
              容器圓角 <span>{{ radius }}px</span>
            </div>
            <q-slider
              v-model="radius"
              :min="0"
              :max="32"
              label
              aria-label="容器圓角"
            /><q-separator class="q-my-md" />
            <div class="row items-center justify-between">
              <span style="font-size: 12px">緊湊模式</span
              ><q-toggle v-model="compact" size="sm" aria-label="緊湊模式" />
            </div>
            <div class="row items-center justify-between">
              <span style="font-size: 12px">深色模式</span
              ><q-toggle v-model="dark" size="sm" aria-label="深色模式" />
            </div>
            <EButton
              class="full-width q-mt-md"
              variant="secondary"
              icon="content_copy"
              @click="copy(tokensCode)"
              >複製主題設定</EButton
            ><q-btn
              flat
              size="sm"
              class="full-width q-mt-xs"
              label="恢復預設"
              @click="resetTheme"
            />
            <div class="theme-footer">
              修改集中在 theme.css。<br />將設定貼回 :root，即可保存你的風格。
            </div>
          </aside>
        </div></template
      >
      <template v-else-if="page === 'components'"
        ><div class="page-heading">
          <div>
            <span class="eyebrow">COMPONENT EXPLORER</span>
            <h2 class="q-mt-sm">基礎元件</h2>
            <p>
              {{ catalog.length }} 個可執行 Demo，原碼直接讀取專案內的 Vue
              檔案。
            </p>
          </div>
          <q-btn
            outline
            color="primary"
            label="官方目錄"
            href="https://quasar.dev/components/"
            target="_blank"
            icon-right="open_in_new"
          />
        </div>
        <div class="row q-gutter-sm q-mb-lg">
          <q-input
            v-model="query"
            dense
            outlined
            placeholder="搜尋元件名稱…"
            style="width: 250px"
            clearable
            @clear="query = ''"
          /><q-select
            v-model="category"
            :options="categories"
            dense
            outlined
            style="width: 140px"
          />
        </div>
        <div class="catalog-layout">
          <div class="glass catalog-list">
            <button
              v-for="item in visible"
              :key="item.name"
              :class="['catalog-item', { active: selected === item.name }]"
              @click="select(item.name)"
            >
              {{ item.label
              }}<small>{{ item.name }} · {{ item.category }}</small>
            </button>
            <p v-if="!visible.length" class="q-pa-md">找不到符合的元件。</p>
          </div>
          <section class="glass showcase">
            <div class="panel-head">
              <h3>
                {{ current.label }} <small>{{ current.name }}</small>
              </h3>
              <q-btn
                flat
                dense
                size="sm"
                icon="content_copy"
                label="複製 Vue 原碼"
                @click="copy(currentCode)"
              />
            </div>
            <q-tabs
              v-model="detailTab"
              dense
              active-color="primary"
              align="left"
              class="q-mb-lg"
              ><q-tab name="demo" label="實際效果" /><q-tab
                name="compare"
                label="三種主題比較" /><q-tab
                name="source"
                label="Vue 原碼" /><q-tab name="api" label="API 參考"
            /></q-tabs>
            <div v-if="detailTab === 'demo'" class="material-stage">
              <component
                :is="demos[`./examples/${current.file}`]"
                :key="current.name"
              />
            </div>
            <div v-else-if="detailTab === 'compare'" class="material-compare">
              <section v-for="item in materialOptions" :key="item.value">
                <div class="panel-head">
                  <h3>{{ item.label }}</h3>
                  <button
                    class="code-toggle"
                    @click="
                      copy(
                        themedCode(
                          sources['./examples/' + current.file] || '',
                          item.value,
                        ),
                      )
                    "
                  >
                    複製原碼
                  </button>
                </div>
                <div class="material-stage">
                  <EThemeProvider :theme="item.value"
                    ><component
                      :is="demos['./examples/' + current.file]"
                      :key="current.name + item.value"
                  /></EThemeProvider>
                </div>
              </section>
            </div>
            <pre v-else-if="detailTab === 'source'" class="source">{{
              currentCode
            }}</pre>
            <div v-else>
              <p>
                API 來自已安裝的 Quasar
                {{ version.quasar }} 套件；下列為該元件的 props、events 和
                slots。
              </p>
              <div class="api-grid">
                <div
                  v-for="prop in api?.props"
                  :key="prop.name"
                  class="api-item"
                >
                  <b>{{ prop.name }}</b
                  ><small>{{ prop.type }}</small>
                  <p>{{ prop.description }}</p>
                </div>
              </div>
              <h3 class="q-mt-lg">Events</h3>
              <p>{{ api?.events.join(" · ") || "無" }}</p>
              <h3>Slots</h3>
              <p>{{ api?.slots.join(" · ") || "無" }}</p>
            </div>
          </section>
        </div>
        <section class="glass showcase q-mt-lg">
          <h3>完整 API 盤點與涵蓋範圍</h3>
          <p>
            共 {{ components.length }} 個元件 API。122 個視覺元件各有
            Demo；子元件在父容器中展示。下列是非視覺的表單 mixin，只提供 API
            盤點。{{ inventory.length - components.length }} 個非元件 API
            亦收錄於 inventory.json。
          </p>
          <div class="row q-gutter-xs">
            <q-chip
              v-for="item in related"
              :key="item.name"
              size="sm"
              outline
              color="primary"
              >{{ item.name }}</q-chip
            >
          </div>
        </section></template
      >
      <template v-else-if="page === 'patterns'"
        ><div class="page-heading">
          <div>
            <span class="eyebrow">COMPOSITION PATTERNS</span>
            <h2 class="q-mt-sm">常用操作，組合好了。</h2>
            <p>基礎外觀與操作流程集中管理，點選元件查看實作原碼。</p>
          </div>
          <EButton icon="open_in_new" @click="page = 'customers'"
            >查看完整頁面</EButton
          >
        </div>
        <div class="api-grid">
          <button
            v-for="[file, description] in [
              ['EPage.vue', '頁面標題、說明與操作區'],
              ['ESearchForm.vue', '搜尋、清除與收合條件'],
              ['EDataTable.vue', '分頁、排序、選取與操作欄'],
              ['EFormDialog.vue', '驗證、新增編輯與儲存狀態'],
              ['EStatusBadge.vue', '統一狀態文字與顏色'],
              ['EEmptyState.vue', '無資料與查無結果'],
              ['EAppLayout.vue', '側邊選單與響應式版型'],
            ]"
            :key="file"
            class="glass showcase text-left cursor-pointer"
            style="color: inherit"
            @click="showFile(file)"
          >
            <q-icon name="data_object" color="primary" size="25px" />
            <h3 class="q-mt-md" style="font-size: 15px">
              {{ file.replace(".vue", "") }}
            </h3>
            <p style="font-size: 12px; margin: 0">{{ description }}</p>
          </button>
        </div>
        <div class="glass showcase q-mt-lg">
          <component :is="demos['./examples/Patterns.vue']" />
        </div>
        <div class="q-mt-lg"><CustomerPage /></div
      ></template>
      <CustomerPage v-else-if="page === 'customers'" />
      <template v-else-if="page === 'source'"
        ><div class="page-heading">
          <div>
            <span class="eyebrow">OPEN THE SOURCE</span>
            <h2 class="q-mt-sm">看得懂，也改得動。</h2>
            <p>
              左側選檔案，右側就是實際原碼。可直接在 src/ui 與 src/examples
              修改。
            </p>
          </div>
        </div>
        <div class="catalog-layout">
          <aside class="glass catalog-list">
            <div class="sidebar-caption" style="margin-top: 10px">
              共用元件與主題
            </div>
            <button
              v-for="file in libraryFiles"
              :key="file"
              :class="['catalog-item', { active: sourceFile === file }]"
              @click="sourceFile = file"
            >
              {{ file }}
            </button>
            <div class="sidebar-caption">可執行範例</div>
            <button
              v-for="file in exampleFiles"
              :key="file"
              :class="['catalog-item', { active: sourceFile === file }]"
              @click="sourceFile = file"
            >
              {{ file }}
            </button>
          </aside>
          <section class="glass showcase">
            <div class="panel-head">
              <h3>{{ sourceFile }}</h3>
              <EButton
                variant="secondary"
                icon="content_copy"
                @click="copy(fileCode)"
                >複製原碼</EButton
              >
            </div>
            <pre class="source" style="max-height: 620px">{{ fileCode }}</pre>
            <h3 style="font-size: 14px" class="q-mt-lg">怎麼開始？</h3>
            <p style="font-size: 12px">
              1. 選擇需要的 Demo，複製 Vue 原碼。<br />2. 自有元件從 src/ui
              匯入；基礎 Demo 依賴 Quasar。<br />3.
              將資料、事件換成自己的業務邏輯。<br />4. 共用風格集中修改
              src/ui/theme.css。<br />完整安裝、套件引用與目錄說明請看
              README.md。
            </p>
          </section>
        </div></template
      >
      <EEmptyState v-else title="找不到這個頁面"
        ><EButton @click="page = 'overview'">回到總覽</EButton></EEmptyState
      >
      <footer class="footer-note">
        EDESIGN · BUILT TO BE YOURS. <span class="q-mx-sm">/</span> Demo
        與原碼，一起交到你手上。
      </footer>
    </EAppLayout></EThemeProvider
  >
</template>
