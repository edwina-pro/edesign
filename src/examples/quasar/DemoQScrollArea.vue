<template>
  <div class="q-gutter-md">
    <q-scroll-area style="height: 200px"
      ><div v-for="n in 20" :key="n" class="q-pa-sm">
        清單項目 {{ n }}
      </div></q-scroll-area
    >
  </div>
</template>
