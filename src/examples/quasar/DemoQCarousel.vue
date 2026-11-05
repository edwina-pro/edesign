<script setup lang="ts">
import { ref } from "vue";
const slide = ref("one");
</script>
<template>
  <div class="q-gutter-md">
    <q-carousel
      v-model="slide"
      animated
      navigation
      arrows
      height="240px"
      class="rounded-borders"
      ><q-carousel-slide name="one" class="bg-purple-2 column flex-center"
        ><q-icon name="layers" size="60px" color="primary" />
        <h3>Glass Design</h3></q-carousel-slide
      ><q-carousel-slide name="two" class="bg-teal-1 column flex-center"
        ><q-icon name="code" size="60px" color="teal" />
        <h3>Copy. Build. Repeat.</h3></q-carousel-slide
      ></q-carousel
    >
  </div>
</template>
