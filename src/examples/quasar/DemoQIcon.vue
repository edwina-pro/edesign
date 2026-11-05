<template>
  <div class="q-gutter-md">
    <q-icon
      v-for="icon in [
        'dashboard',
        'favorite_border',
        'settings',
        'layers',
        'auto_awesome',
      ]"
      :key="icon"
      :name="icon"
      size="36px"
      color="primary"
    />
  </div>
</template>
