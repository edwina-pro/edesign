<script setup lang="ts">
import { useTheme, type ETheme } from "./material";
import { QDialog, QCard, QForm, QBtn } from "quasar";
import EButton from "./EButton.vue";
const themeProps = defineProps<{
  theme?: ETheme;
  title: string;
  loading?: boolean;
}>();
const model = defineModel<boolean>({ default: false });
defineEmits<{ submit: [] }>();
const resolvedTheme = useTheme(themeProps);
</script>
<template>
  <QDialog v-model="model" :persistent="loading"
    ><QCard :data-e-theme="resolvedTheme" class="glass form-dialog"
      ><QForm @submit="$emit('submit')"
        ><header class="page-heading">
          <h2>{{ title }}</h2>
          <QBtn
            flat
            round
            icon="close"
            aria-label="關閉"
            :disable="loading"
            @click="model = false"
          />
        </header>
        <div class="q-gutter-md"><slot /></div>
        <footer class="row justify-end q-gutter-sm q-mt-lg">
          <EButton variant="ghost" :disable="loading" @click="model = false"
            >取消</EButton
          ><EButton type="submit" :loading="loading">儲存</EButton>
        </footer></QForm
      ></QCard
    ></QDialog
  >
</template>
