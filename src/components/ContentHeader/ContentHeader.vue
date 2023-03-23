<template>
  <div class="content-header">
    <div
      v-if="slots.headlineLeft || slots.headlineRight"
      class="content-header__headline"
    >
      <div class="content-header__headline-left">
        <slot name="headlineLeft" />
      </div>
      <div class="content-header__headline-right">
        <slot name="headlineRight" />
      </div>
    </div>
    <div class="content-header__content">
      <slot name="content" />
    </div>
    <div v-if="slots.anchorNav" class="content-header__anchor-nav">
      <slot name="anchorNav" />
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

.content-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px 32px 0;
  background-color: $color-background-neutral--light-02;
  z-index: 100;
}

.content-header__headline,
.content-header__headline-left,
.content-header__content,
.content-header__anchor-nav {
  display: flex;
  align-items: center;
}

.content-header__headline-right {
  display: flex;
  align-items: flex-end;
  gap: 4px;
}

.content-header__headline {
  justify-content: space-between;
  margin-bottom: 16px;
}

.content-header__content {
  margin-bottom: 16px;
}

.content-header__anchor-nav {
  padding-top: 8px;
  padding-bottom: 8px;
  gap: 8px;
}
</style>
