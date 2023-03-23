<template>
  <div class="menulist">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.menulist {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
}
</style>
