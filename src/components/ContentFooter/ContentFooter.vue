<template>
  <div class="content-footer">
    <div v-if="slots.footerLeft" class="content-footer__left">
      <slot name="footerLeft" />
    </div>
    <div v-if="slots.footerCenter" class="content-footer__center">
      <slot name="footerCenter" />
    </div>
    <div v-if="slots.footerRight" class="content-footer__right">
      <slot name="footerRight" />
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

.content-footer {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 16px;
  background-color: $color-background-neutral--white;
  z-index: 100;
  box-shadow: $shadow-panel-default;
}

.content-footer__left,
.content-footer__center,
.content-footer__right {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.content-footer__center {
  width: 100%;
}
</style>
