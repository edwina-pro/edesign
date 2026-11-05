<template>
  <div class="q-gutter-md">
    <q-layout container view="hHh Lpr fFf" style="height: 280px" class="glass"
      ><q-header class="bg-primary"
        ><q-toolbar
          ><q-toolbar-title>我的系統</q-toolbar-title></q-toolbar
        ></q-header
      ><q-drawer :model-value="true" :width="150" bordered
        ><q-list
          ><q-item clickable
            ><q-item-section>儀表板</q-item-section></q-item
          ></q-list
        ></q-drawer
      ><q-page-container
        ><q-page padding>可重複使用的系統版型</q-page></q-page-container
      ><q-footer class="bg-primary q-pa-sm">共用頁尾</q-footer></q-layout
    >
  </div>
</template>
