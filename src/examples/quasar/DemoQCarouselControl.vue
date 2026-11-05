<script setup lang="ts">
import { ref } from "vue";
const slide = ref("one");
</script>
<template>
  <div class="q-gutter-md">
    <q-carousel v-model="slide" height="220px" class="bg-purple-1"
      ><q-carousel-slide name="one">第一張</q-carousel-slide
      ><q-carousel-slide name="two">第二張</q-carousel-slide
      ><template #control
        ><q-carousel-control position="bottom-right"
          ><q-btn
            color="primary"
            label="切換"
            @click="
              slide = slide === 'one' ? 'two' : 'one'
            " /></q-carousel-control></template
    ></q-carousel>
  </div>
</template>
