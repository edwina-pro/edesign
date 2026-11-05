<template>
  <div class="q-gutter-md">
    <q-layout container style="height: 260px"
      ><q-page-container
        ><q-page padding style="min-height: 650px"
          >向下捲動查看固定操作<q-page-scroller
            :scroll-offset="60"
            position="bottom-right"
            :offset="[12, 12]"
            ><q-btn
              round
              color="primary"
              icon="keyboard_arrow_up"
              aria-label="固定操作" /></q-page-scroller></q-page></q-page-container
    ></q-layout>
  </div>
</template>
