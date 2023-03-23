<template>
  <div class="header">
    <div class="header__left">
      <div v-if="slots.leftControl" class="header__left-ctrl">
        <slot name="leftControl" />
      </div>
      <slot slots />
    </div>
    <div v-if="slots.rightControl" class="header__right">
      <slot name="rightControl" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
const slots = useSlots();
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.header {
  background: $color-background-neutral--dark-03;
  color: $color-content-text--white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 8px 24px;
  width: 100%;
}

.header__left {
  display: flex;
  gap: 24px;
  align-items: center;
}

.header__right {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
