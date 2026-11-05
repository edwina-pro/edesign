<script setup lang="ts">
import { ref } from "vue";
const step = ref(1);
</script>
<template>
  <div class="q-gutter-md">
    <q-stepper v-model="step" color="primary" animated flat
      ><q-step :name="1" title="基本資料" icon="person" :done="step > 1"
        >填寫你的基本資料。</q-step
      ><q-step :name="2" title="確認內容" icon="check">確認資料後完成。</q-step
      ><template #navigation
        ><q-stepper-navigation
          ><q-btn
            color="primary"
            :label="step === 1 ? '下一步' : '重新開始'"
            @click="
              step = step === 1 ? 2 : 1
            " /></q-stepper-navigation></template
    ></q-stepper>
  </div>
</template>
