<template>
  <div class="q-gutter-md">
    <q-uploader hide-upload-btn label="自訂選取按鈕"
      ><template #header="scope"
        ><div class="row items-center q-pa-sm full-width">
          <span>本機檔案佇列</span><q-space /><q-btn
            v-if="scope.canAddFiles"
            round
            dense
            flat
            icon="add"
            aria-label="加入檔案"
            ><q-uploader-add-trigger
          /></q-btn></div></template
    ></q-uploader>
  </div>
</template>
