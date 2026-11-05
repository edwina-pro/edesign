<script setup lang="ts">
import { useTheme, type ETheme } from "./material";
import { ref } from "vue";
import { QForm, QBtn } from "quasar";
import EButton from "./EButton.vue";
const expanded = ref(true);
defineEmits<{ search: []; reset: [] }>();
const themeProps = defineProps<{ theme?: ETheme }>();
const resolvedTheme = useTheme(themeProps);
</script>
<template>
  <QForm
    :data-e-theme="resolvedTheme"
    class="glass search-form"
    @submit="$emit('search')"
    @reset="$emit('reset')"
    ><div class="row items-center justify-between">
      <strong>查詢條件</strong
      ><QBtn
        flat
        round
        size="sm"
        :icon="expanded ? 'expand_less' : 'expand_more'"
        aria-label="切換查詢條件"
        @click="expanded = !expanded"
      />
    </div>
    <div v-show="expanded" class="search-fields"><slot /></div>
    <div class="row justify-end q-gutter-sm">
      <EButton type="reset" variant="ghost">清除</EButton
      ><EButton type="submit" icon="search">搜尋</EButton>
    </div></QForm
  >
</template>
