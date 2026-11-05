import { mkdir, writeFile, readFile, unlink } from "node:fs/promises";
import ts from "typescript";
// These are executable examples, not downloaded documentation snippets.
const examples = {
  QBtn: [
    "按鈕",
    "操作",
    '<q-btn color="primary" label="主要按鈕" no-caps @click="notify(\'已點擊\')"/><q-btn outline color="primary" label="外框按鈕"/><q-btn flat color="primary" label="文字按鈕"/>',
  ],
  QBtnDropdown: [
    "下拉按鈕",
    "操作",
    '<q-btn-dropdown color="primary" label="更多操作"><q-list><q-item clickable v-close-popup @click="notify(\'已選擇匯出\')"><q-item-section>匯出報表</q-item-section></q-item><q-item clickable v-close-popup @click="notify(\'已選擇分享\')"><q-item-section>分享</q-item-section></q-item></q-list></q-btn-dropdown>',
  ],
  QBtnGroup: [
    "按鈕群組",
    "操作",
    '<q-btn-group unelevated><q-btn color="primary" label="每日"/><q-btn color="primary" label="每週"/><q-btn color="primary" label="每月"/></q-btn-group>',
  ],
  QBtnToggle: [
    "切換按鈕",
    "操作",
    '<q-btn-toggle v-model="choice" toggle-color="primary" :options="options"/>',
  ],
  QFab: [
    "浮動操作",
    "操作",
    '<q-fab color="primary" icon="add" direction="right"><q-fab-action color="secondary" icon="edit" @click="notify(\'編輯\')"/><q-fab-action color="primary" icon="mail" @click="notify(\'郵件\')"/></q-fab>',
  ],
  QInput: [
    "文字輸入",
    "表單",
    '<q-input v-model="text" outlined label="專案名稱" clearable/><q-input v-model="text" outlined label="唯讀欄位" readonly/>',
  ],
  QField: [
    "欄位容器",
    "表單",
    '<q-field outlined label="自訂內容" stack-label><template #control><div class="self-center">可放置自訂的表單內容</div></template></q-field>',
  ],
  QSelect: [
    "下拉選單",
    "表單",
    '<q-select v-model="choice" :options="options" emit-value map-options outlined label="選擇方案"/>',
  ],
  QCheckbox: [
    "核取方塊",
    "表單",
    '<q-checkbox v-model="checked" label="接收更新通知" color="primary"/>',
  ],
  QRadio: [
    "單選按鈕",
    "表單",
    '<q-radio v-model="choice" val="a" label="一般方案"/><q-radio v-model="choice" val="b" label="專業方案"/>',
  ],
  QToggle: [
    "開關",
    "表單",
    '<q-toggle v-model="checked" label="啟用功能" color="primary"/>',
  ],
  QOptionGroup: [
    "選項群組",
    "表單",
    '<q-option-group v-model="choice" :options="options" color="primary"/>',
  ],
  QSlider: [
    "滑桿",
    "表單",
    '<q-slider v-model="number" :min="0" :max="100" label color="primary"/>',
  ],
  QRange: [
    "範圍選擇",
    "表單",
    '<q-range v-model="range" :min="0" :max="100" label color="primary"/>',
  ],
  QKnob: [
    "旋鈕",
    "表單",
    '<q-knob v-model="number" :min="0" :max="100" size="100px" color="primary" track-color="grey-3" show-value/>',
  ],
  QRating: [
    "評分",
    "表單",
    '<q-rating v-model="rating" size="32px" color="amber" :max="5"/>',
  ],
  QDate: ["日期", "表單", '<q-date v-model="date" color="primary"/>'],
  QTime: ["時間", "表單", '<q-time v-model="time" color="primary" format24h/>'],
  QColor: [
    "顏色",
    "表單",
    '<q-color v-model="color" style="max-width:320px"/>',
  ],
  QFile: [
    "檔案選擇",
    "表單",
    '<q-file v-model="file" outlined label="選擇檔案" counter clearable><template #prepend><q-icon name="attach_file"/></template></q-file>',
  ],
  QUploader: [
    "檔案佇列",
    "表單",
    '<q-uploader label="本機檔案佇列（不傳送伺服器）" multiple hide-upload-btn style="max-width:100%"/><p class="q-mt-md">此範例只示範選取檔案；正式上傳需自行設定後端 URL。</p>',
  ],
  QEditor: [
    "文字編輯器",
    "表單",
    '<q-editor v-model="html" min-height="150px"/>',
  ],
  QForm: [
    "表單驗證",
    "表單",
    '<q-form @submit="notify(\'驗證成功\')" class="q-gutter-md"><q-input v-model="text" outlined label="必填名稱" :rules="[v=>!!v||\'請輸入名稱\']"/><q-btn type="submit" color="primary" label="送出"/></q-form>',
  ],
  QCard: [
    "卡片",
    "容器",
    '<q-card style="max-width:360px"><q-card-section><div class="text-h6">玻璃卡片</div><p>透明表面、細緻邊框，以及背景模糊。</p></q-card-section><q-card-actions><q-btn flat color="primary" label="了解更多" @click="notify(\'卡片操作\')"/></q-card-actions></q-card>',
  ],
  QBanner: [
    "提示橫幅",
    "容器",
    '<q-banner rounded class="bg-purple-1 text-primary"><template #avatar><q-icon name="info"/></template>你的元件庫已準備就緒。<template #action><q-btn flat label="知道了" @click="notify(\'已確認\')"/></template></q-banner>',
  ],
  QDialog: [
    "對話視窗",
    "容器",
    '<q-btn color="primary" label="開啟視窗" @click="open=true"/><q-dialog v-model="open"><q-card class="q-pa-lg"><h3>確認你的操作</h3><p>這是一個使用共用玻璃主題的視窗。</p><q-btn v-close-popup color="primary" label="完成"/></q-card></q-dialog>',
  ],
  QMenu: [
    "選單",
    "容器",
    '<q-btn color="primary" label="開啟選單"><q-menu><q-list style="min-width:180px"><q-item v-for="item in items" :key="item" clickable v-close-popup @click="notify(item)"><q-item-section>{{ item }}</q-item-section></q-item></q-list></q-menu></q-btn>',
  ],
  QPopupProxy: [
    "自適應彈出",
    "容器",
    '<q-btn outline color="primary" label="選擇日期"><q-popup-proxy><q-date v-model="date"/></q-popup-proxy></q-btn>',
  ],
  QPopupEdit: [
    "行內編輯",
    "容器",
    '<span class="cursor-pointer text-primary">{{ text || \'點擊編輯名稱\' }}<q-popup-edit v-model="text" v-slot="scope" buttons label-set="儲存" label-cancel="取消"><q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set"/></q-popup-edit></span>',
  ],
  QExpansionItem: [
    "展開面板",
    "容器",
    '<q-list bordered class="rounded-borders"><q-expansion-item icon="help_outline" label="如何使用 edesign？"><q-card><q-card-section>查看 Demo，複製原碼，接上自己的資料與事件。</q-card-section></q-card></q-expansion-item></q-list>',
  ],
  QSplitter: [
    "分隔面板",
    "容器",
    '<q-splitter v-model="split" style="height:160px"><template #before><div class="q-pa-md">左側內容</div></template><template #after><div class="q-pa-md">右側內容 · 拖動分隔線</div></template></q-splitter>',
  ],
  QLayout: [
    "應用佈局",
    "導覽",
    '<q-layout container view="hHh Lpr fFf" style="height:280px" class="glass"><q-header class="bg-primary"><q-toolbar><q-toolbar-title>我的系統</q-toolbar-title></q-toolbar></q-header><q-drawer :model-value="true" :width="150" bordered><q-list><q-item clickable><q-item-section>儀表板</q-item-section></q-item></q-list></q-drawer><q-page-container><q-page padding>可重複使用的系統版型</q-page></q-page-container></q-layout>',
  ],
  QDrawer: [
    "側邊選單",
    "導覽",
    '<q-layout container style="height:250px"><q-drawer v-model="checked" :width="150" bordered><q-list><q-item v-for="item in items" :key="item"><q-item-section>{{ item }}</q-item-section></q-item></q-list></q-drawer><q-page-container><q-page padding><q-btn color="primary" label="切換側欄" @click="checked=!checked"/></q-page></q-page-container></q-layout>',
  ],
  QToolbar: [
    "工具列",
    "導覽",
    '<q-toolbar class="glass"><q-btn flat round icon="menu" aria-label="選單" @click="notify(\'選單\')"/><q-toolbar-title>應用程式</q-toolbar-title><q-btn flat round icon="notifications_none" aria-label="通知" @click="notify(\'沒有新的通知\')"/></q-toolbar>',
  ],
  QBreadcrumbs: [
    "麵包屑",
    "導覽",
    '<q-breadcrumbs><q-breadcrumbs-el label="首頁" icon="home"/><q-breadcrumbs-el label="元件庫"/><q-breadcrumbs-el label="導覽"/></q-breadcrumbs>',
  ],
  QTabs: [
    "頁籤",
    "導覽",
    '<q-tabs v-model="tab" active-color="primary"><q-tab name="overview" label="總覽"/><q-tab name="settings" label="設定"/></q-tabs><q-tab-panels v-model="tab" animated class="bg-transparent"><q-tab-panel name="overview">專案總覽內容</q-tab-panel><q-tab-panel name="settings">專案設定內容</q-tab-panel></q-tab-panels>',
  ],
  QTabPanels: [
    "分頁內容",
    "導覽",
    '<q-btn-toggle v-model="tab" :options="[{label:\'總覽\',value:\'overview\'},{label:\'設定\',value:\'settings\'}]"/><q-tab-panels v-model="tab" animated class="bg-transparent"><q-tab-panel name="overview">這是總覽內容。</q-tab-panel><q-tab-panel name="settings">這是設定內容。</q-tab-panel></q-tab-panels>',
  ],
  QPagination: [
    "分頁",
    "導覽",
    '<q-pagination v-model="page" :max="10" :max-pages="5" direction-links color="primary"/>',
  ],
  QStepper: [
    "步驟",
    "導覽",
    '<q-stepper v-model="step" color="primary" animated flat><q-step :name="1" title="基本資料" icon="person" :done="step>1">填寫你的基本資料。</q-step><q-step :name="2" title="確認內容" icon="check">確認資料後完成。</q-step><template #navigation><q-stepper-navigation><q-btn color="primary" :label="step===1?\'下一步\':\'重新開始\'" @click="step=step===1?2:1"/></q-stepper-navigation></template></q-stepper>',
  ],
  QTree: [
    "樹狀結構",
    "資料",
    '<q-tree :nodes="nodes" node-key="label" default-expand-all/>',
  ],
  QTable: [
    "資料表格",
    "資料",
    '<q-table title="團隊成員" :rows="rows" :columns="columns" row-key="id" flat :pagination="{rowsPerPage:5}"/>',
  ],
  QMarkupTable: [
    "簡易表格",
    "資料",
    '<q-markup-table flat><thead><tr><th class="text-left">方案</th><th class="text-left">狀態</th></tr></thead><tbody><tr><td>edesign 基礎版</td><td>可使用</td></tr><tr><td>玻璃主題</td><td>已啟用</td></tr></tbody></q-markup-table>',
  ],
  QList: [
    "清單",
    "資料",
    '<q-list bordered separator class="rounded-borders"><q-item v-for="item in items" :key="item" clickable @click="notify(item)"><q-item-section avatar><q-icon name="folder_open" color="primary"/></q-item-section><q-item-section>{{ item }}</q-item-section><q-item-section side><q-icon name="chevron_right"/></q-item-section></q-item></q-list>',
  ],
  QTimeline: [
    "時間軸",
    "資料",
    '<q-timeline color="primary"><q-timeline-entry title="建立元件庫" subtitle="STEP 01">統一基礎樣式。</q-timeline-entry><q-timeline-entry title="建立展示站" subtitle="STEP 02">每個 Demo 都附上實際原碼。</q-timeline-entry></q-timeline>',
  ],
  QChatMessage: [
    "聊天訊息",
    "資料",
    '<q-chat-message name="Edwin" :text="[\'這套元件可以自己修改嗎？\']" sent/><q-chat-message name="edesign" :text="[\'可以，所有 Vue 原碼都在專案內。\']" bg-color="purple-1"/>',
  ],
  QAvatar: [
    "頭像",
    "媒體",
    '<q-avatar color="primary" text-color="white" size="60px">ED</q-avatar><q-avatar color="teal-1" text-color="teal" icon="person" size="60px"/>',
  ],
  QBadge: [
    "徽章",
    "媒體",
    '<q-badge color="primary" label="NEW"/><q-badge color="teal" label="已完成"/><q-btn outline color="primary" label="通知"><q-badge floating color="red">3</q-badge></q-btn>',
  ],
  QChip: [
    "標籤",
    "媒體",
    '<q-chip color="purple-1" text-color="primary" icon="check">設計系統</q-chip><q-chip v-model="checked" removable color="teal-1" text-color="teal">可移除標籤</q-chip>',
  ],
  QIcon: [
    "圖示",
    "媒體",
    "<q-icon v-for=\"icon in ['dashboard','favorite_border','settings','layers','auto_awesome']\" :key=\"icon\" :name=\"icon\" size=\"36px\" color=\"primary\"/>",
  ],
  QImg: [
    "圖片",
    "媒體",
    '<q-img src="/sample.svg" :ratio="16/9" style="max-width:400px;border-radius:16px"><div class="absolute-bottom text-subtitle1">本機圖片 · 不依賴外部圖床</div></q-img>',
  ],
  QCarousel: [
    "輪播",
    "媒體",
    '<q-carousel v-model="slide" animated navigation arrows height="240px" class="rounded-borders"><q-carousel-slide name="one" class="bg-purple-2 column flex-center"><q-icon name="layers" size="60px" color="primary"/><h3>Glass Design</h3></q-carousel-slide><q-carousel-slide name="two" class="bg-teal-1 column flex-center"><q-icon name="code" size="60px" color="teal"/><h3>Copy. Build. Repeat.</h3></q-carousel-slide></q-carousel>',
  ],
  QParallax: [
    "視差背景",
    "媒體",
    '<q-parallax src="/sample.svg" :height="200"><h3 class="text-white">捲動頁面查看視差效果</h3></q-parallax>',
  ],
  QVideo: [
    "影片容器",
    "媒體",
    '<q-video src="/video-placeholder.html" :ratio="16/9" style="max-width:460px"/><p>此處使用本機說明頁；正式使用時將 src 換成允許嵌入的影片網址。</p>',
  ],
  QTooltip: [
    "提示文字",
    "媒體",
    '<q-btn color="primary" label="滑鼠移到這裡"><q-tooltip>統一風格的操作提示</q-tooltip></q-btn>',
  ],
  QLinearProgress: [
    "線型進度",
    "回饋",
    '<q-linear-progress :value="number/100" color="primary" rounded size="9px"/><q-slider v-model="number" :min="0" :max="100" label/>',
  ],
  QCircularProgress: [
    "環型進度",
    "回饋",
    '<q-circular-progress show-value :value="number" size="90px" :thickness=".15" color="primary" track-color="grey-3">{{ number }}%</q-circular-progress><q-slider v-model="number" :min="0" :max="100" label/>',
  ],
  QSpinner: [
    "載入動畫",
    "回饋",
    '<q-spinner color="primary" size="42px"/><q-spinner-dots color="secondary" size="42px"/><q-spinner-hourglass color="primary" size="42px"/>',
  ],
  QSkeleton: [
    "骨架屏",
    "回饋",
    '<div style="width:100%"><q-skeleton type="text" width="45%"/><q-skeleton type="text"/><q-skeleton type="rect" height="100px" class="q-mt-md"/></div>',
  ],
  QInnerLoading: [
    "區域載入",
    "回饋",
    '<q-toggle v-model="checked" label="顯示載入遮罩"/><div class="relative-position glass q-pa-xl q-mt-md">內容區域<q-inner-loading :showing="checked" color="primary"/></div>',
  ],
  QAjaxBar: [
    "Ajax 進度",
    "回饋",
    '<q-btn color="primary" label="模擬請求" @click="runBar"/><q-ajax-bar ref="bar" position="top" color="primary" size="4px" skip-hijack/>',
  ],
  QScrollArea: [
    "捲動區域",
    "捲動",
    '<q-scroll-area style="height:200px"><div v-for="n in 20" :key="n" class="q-pa-sm">清單項目 {{ n }}</div></q-scroll-area>',
  ],
  QVirtualScroll: [
    "虛擬清單",
    "捲動",
    '<q-virtual-scroll :items="longItems" style="max-height:240px" v-slot="{item,index}"><q-item :key="index"><q-item-section>{{ item }}</q-item-section></q-item></q-virtual-scroll>',
  ],
  QInfiniteScroll: [
    "無限捲動",
    "捲動",
    '<div style="max-height:220px;overflow:auto"><q-infinite-scroll @load="loadMore" :offset="50" :disable="loaded>=30"><div v-for="n in loaded" :key="n" class="q-pa-sm">資料 {{ n }}</div><template #loading><q-spinner color="primary"/></template></q-infinite-scroll></div><p>本機示範最多載入 30 筆。</p>',
  ],
  QPullToRefresh: [
    "下拉更新",
    "捲動",
    '<q-pull-to-refresh @refresh="refresh"><div class="glass q-pa-xl">向下拖曳更新 · 已更新 {{ refreshCount }} 次</div></q-pull-to-refresh>',
  ],
  QScrollObserver: [
    "捲動觀察",
    "捲動",
    '<div style="height:180px;overflow:auto" class="relative-position"><q-scroll-observer @scroll="scrollPosition=$event.position.top"/><div style="height:600px" class="q-pa-md">捲動這個區塊</div></div><p>垂直位置：{{ scrollPosition }} px</p>',
  ],
  QResizeObserver: [
    "尺寸觀察",
    "工具",
    '<div style="resize:horizontal;overflow:auto;min-width:150px;max-width:100%;width:280px" class="glass q-pa-lg relative-position"><q-resize-observer @resize="width=$event.width"/>拖曳右下角調整寬度</div><p>寬度：{{ width }} px</p>',
  ],
  QIntersection: [
    "可視區域",
    "工具",
    '<q-intersection transition="scale"><div class="glass q-pa-xl">進入可視區域時顯示。</div></q-intersection>',
  ],
  QResponsive: [
    "固定比例",
    "工具",
    '<q-responsive :ratio="16/9" style="max-width:400px" class="glass"><div class="flex flex-center">16 : 9 自適應內容</div></q-responsive>',
  ],
  QSeparator: [
    "分隔線",
    "工具",
    '<div>第一個區塊</div><q-separator class="q-my-lg"/><div>第二個區塊</div>',
  ],
  QSpace: [
    "彈性空間",
    "工具",
    '<div class="row items-center glass q-pa-md"><span>左側內容</span><q-space/><q-btn flat color="primary" label="右側操作"/></div>',
  ],
  QBar: [
    "頂部小工具列",
    "工具",
    '<q-bar class="glass"><q-icon name="layers"/><div>edesign workspace</div><q-space/><q-icon name="minimize"/><q-icon name="crop_square"/><q-icon name="close"/></q-bar>',
  ],
  QSlideItem: [
    "滑動操作",
    "工具",
    '<q-slide-item @left="slideAction" @right="slideAction"><template #left><q-icon name="done"/></template><template #right><q-icon name="delete"/></template><q-item class="glass"><q-item-section>向左或向右拖曳這個項目</q-item-section></q-item></q-slide-item>',
  ],
  QSlideTransition: [
    "展開動畫",
    "工具",
    '<q-btn color="primary" label="切換內容" @click="checked=!checked"/><q-slide-transition><div v-show="checked" class="glass q-pa-lg q-mt-md">展開與收合的動畫內容。</div></q-slide-transition>',
  ],
  QNoSsr: [
    "僅客戶端",
    "工具",
    '<q-no-ssr><div class="glass q-pa-lg">這個內容只在客戶端渲染。</div></q-no-ssr>',
  ],
};
const aliases = {
  QBreadcrumbsEl: "QBreadcrumbs",
  QCardActions: "QCard",
  QCardSection: "QCard",
  QCarouselControl: "QCarousel",
  QCarouselSlide: "QCarousel",
  QFabAction: "QFab",
  QFooter: "QLayout",
  QHeader: "QLayout",
  QItem: "QList",
  QItemLabel: "QList",
  QItemSection: "QList",
  QPage: "QLayout",
  QPageContainer: "QLayout",
  QStep: "QStepper",
  QStepperNavigation: "QStepper",
  QTab: "QTabs",
  QTabPanel: "QTabPanels",
  QTd: "QTable",
  QTh: "QTable",
  QTr: "QTable",
  QTimelineEntry: "QTimeline",
  QToolbarTitle: "QToolbar",
};
for (const [name, parent] of Object.entries(aliases)) {
  const [, category, template] = examples[parent];
  examples[name] = [
    `${name} 組合示範`,
    category,
    `<p>${name} 需搭配 ${parent} 使用，以下展示實際組合。</p>${template}`,
  ];
}
examples.QCarouselControl[2] =
  '<q-carousel v-model="slide" height="220px" class="bg-purple-1"><q-carousel-slide name="one">第一張</q-carousel-slide><q-carousel-slide name="two">第二張</q-carousel-slide><template #control><q-carousel-control position="bottom-right"><q-btn color="primary" label="切換" @click="slide=slide===\'one\'?\'two\':\'one\'"/></q-carousel-control></template></q-carousel>';
examples.QItemLabel[2] =
  "<q-list bordered><q-item><q-item-section><q-item-label>主要標題</q-item-label><q-item-label caption>這是補充說明文字。</q-item-label></q-item-section></q-item></q-list>";
examples.QFooter[2] = examples.QLayout[2].replace(
  "</q-layout>",
  '<q-footer class="bg-primary q-pa-sm">共用頁尾</q-footer></q-layout>',
);
for (const name of ["QPageScroller", "QPageSticky"])
  examples[name] = [
    name === "QPageScroller" ? "回到頂部" : "固定操作區",
    "導覽",
    `<q-layout container style="height:260px"><q-page-container><q-page padding style="min-height:650px">向下捲動查看固定操作<${name === "QPageScroller" ? 'q-page-scroller :scroll-offset="60"' : 'q-page-sticky"'} position="bottom-right" :offset="[12,12]"><q-btn round color="primary" icon="${name === "QPageScroller" ? "keyboard_arrow_up" : "add"}" aria-label="固定操作"/></${name === "QPageScroller" ? "q-page-scroller" : "q-page-sticky"}></q-page></q-page-container></q-layout>`.replace(
      'q-page-sticky"',
      "q-page-sticky",
    ),
  ];
examples.QRouteTab = [
  "路由頁籤",
  "導覽",
  '<q-tabs><q-route-tab href="#components" label="元件展示"/><q-route-tab href="#customers" label="客戶範例"/></q-tabs><p>此 Demo 使用 href；正式專案可搭配 Vue Router 的 to 屬性。</p>',
];
examples.QUploaderAddTrigger = [
  "自訂檔案選取",
  "表單",
  '<q-uploader hide-upload-btn label="自訂選取按鈕"><template #header="scope"><div class="row items-center q-pa-sm full-width"><span>本機檔案佇列</span><q-space/><q-btn v-if="scope.canAddFiles" round dense flat icon="add" aria-label="加入檔案"><q-uploader-add-trigger/></q-btn></div></template></q-uploader>',
];
examples.QTable[2] = examples.QTable[2].replace(
  "/>",
  '><template #header="props"><q-tr :props="props"><q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th></q-tr></template><template #body="props"><q-tr :props="props"><q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td></q-tr></template></q-table>',
);
for (const name of ["QTd", "QTh", "QTr"])
  examples[name][2] = examples.QTable[2];
const api = JSON.parse(await readFile("src/data/inventory.json", "utf8"));
for (const item of api.filter((i) => /^QSpinner[A-Z]/.test(i.name))) {
  const tag = item.name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/^Q/, "q-")
    .toLowerCase();
  examples[item.name] = [
    item.name.replace("QSpinner", "") + " 載入動畫",
    "回饋",
    `<${tag} color="primary" size="52px"/>`,
  ];
}
const script = `import { ref, onUnmounted } from 'vue'
import { Notify, type QTableColumn } from 'quasar'
const text=ref(''), checked=ref(true), choice=ref('a'), number=ref(65), rating=ref(4), range=ref({min:20,max:70}), date=ref('2026/11/03'), time=ref('14:30'), color=ref('#635bdf'), file=ref<File|null>(null), html=ref('<b>歡迎使用 edesign</b>'), open=ref(false), split=ref(40), tab=ref('overview'), page=ref(1), step=ref(1), slide=ref('one'), loaded=ref(10), refreshCount=ref(0), scrollPosition=ref(0), width=ref(280)
const options=[{label:'一般方案',value:'a'},{label:'專業方案',value:'b'}]
const items=['專案總覽','成員管理','系統設定'], longItems=Array.from({length:1000},(_,i)=>'資料項目 '+(i+1))
const nodes=[{label:'edesign',children:[{label:'基礎元件'},{label:'組合元件',children:[{label:'客戶管理'}]}]}]
const rows=[{id:1,name:'陳怡安',role:'設計師'},{id:2,name:'林冠宇',role:'工程師'}]
const columns:QTableColumn[]=[{name:'name',field:'name',label:'姓名',align:'left',sortable:true},{name:'role',field:'role',label:'職務',align:'left'}]
const notify=(message:string)=>Notify.create({message,color:'primary'})
const bar=ref<{start:()=>void;stop:()=>void}|null>(null)
const timers:ReturnType<typeof setTimeout>[]=[]
function runBar(){bar.value?.start();timers.push(setTimeout(()=>bar.value?.stop(),1200))}
function loadMore(_index:number,done:(stop?:boolean)=>void){timers.push(setTimeout(()=>{loaded.value+=5;done(loaded.value>=30)},350))}
function refresh(done:()=>void){timers.push(setTimeout(()=>{refreshCount.value++;done()},500))}
function slideAction({reset}:{reset:()=>void}){notify('操作完成');reset()}
onUnmounted(()=>timers.forEach(clearTimeout))`;
// Keep every example readable: retain only the state/functions actually used.
function minimalScript(template) {
  const file = ts.createSourceFile(
    "demo.ts",
    script,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const declarations = [];
  for (const node of file.statements) {
    if (ts.isVariableStatement(node))
      for (const d of node.declarationList.declarations)
        declarations.push({
          name: d.name.getText(file),
          text: `const ${d.getText(file)}`,
        });
    else if (ts.isFunctionDeclaration(node))
      declarations.push({ name: node.name.text, text: node.getText(file) });
  }
  const expressions = [
    ...template.matchAll(/(?:v-[\w:-]+|[:@#][\w:-]+)\s*=\s*"([^"]*)"/g),
  ]
    .map((m) => m[1])
    .concat([...template.matchAll(/\{\{([\s\S]*?)\}\}/g)].map((m) => m[1]))
    .join("\n");
  const selected = new Set();
  let body = expressions;
  for (let pass = 0; pass < 10; pass++)
    for (const d of declarations)
      if (!selected.has(d.name) && new RegExp(`\\b${d.name}\\b`).test(body)) {
        selected.add(d.name);
        body += "\n" + d.text;
      }
  const lines = declarations
    .filter((d) => selected.has(d.name))
    .map((d) => d.text);
  const vueImports = [];
  if (/\bref[<(]/.test(lines.join("\n"))) vueImports.push("ref");
  if (selected.has("timers")) {
    vueImports.push("onUnmounted");
    lines.push("onUnmounted(()=>timers.forEach(clearTimeout))");
  }
  const quasarImports = [];
  if (selected.has("notify")) quasarImports.push("Notify");
  if (selected.has("columns")) quasarImports.push("type QTableColumn");
  return [
    ...(vueImports.length
      ? [`import { ${vueImports.join(", ")} } from 'vue'`]
      : []),
    ...(quasarImports.length
      ? [`import { ${quasarImports.join(", ")} } from 'quasar'`]
      : []),
    ...lines,
  ].join("\n");
}
await mkdir("src/examples/quasar", { recursive: true });
const catalog = [];
for (const [name, [label, category, template]] of Object.entries(examples)) {
  const code = minimalScript(template);
  await writeFile(
    `src/examples/quasar/Demo${name}.vue`,
    `${code ? `<script setup lang="ts">\n${code}\n</script>\n` : ""}<template><div class="q-gutter-md">${template}</div></template>\n`,
  );
  try {
    await unlink(`src/examples/quasar/${name}.vue`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  catalog.push({
    name,
    label,
    category,
    file: `quasar/Demo${name}.vue`,
    status: "demo",
  });
}
await mkdir("src/data", { recursive: true });
await writeFile(
  "src/data/catalog.json",
  JSON.stringify(catalog, null, 2) + "\n",
);
await mkdir("public", { recursive: true });
await writeFile(
  "public/sample.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540"><defs><linearGradient id="a" x2="1" y2="1"><stop stop-color="#8175dc"/><stop offset="1" stop-color="#75c7c8"/></linearGradient></defs><rect width="960" height="540" fill="url(#a)"/><circle cx="670" cy="160" r="170" fill="#fff" opacity=".13"/><rect x="150" y="130" width="500" height="300" rx="40" fill="#fff" opacity=".15" stroke="#fff"/><text x="220" y="300" fill="#fff" font-family="sans-serif" font-size="65">edesign.</text></svg>`,
);
await writeFile(
  "public/video-placeholder.html",
  '<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><body style="margin:0;background:#dedaf3;color:#635bdf;display:grid;place-items:center;height:100vh;font:14px sans-serif"><div>▷ 影片嵌入範例<br><small>請將 src 替換為你的影片網址</small></div></body></html>',
);
console.log(`Generated ${catalog.length} runnable component demos`);
await import('./patch-popup-themes.mjs');
