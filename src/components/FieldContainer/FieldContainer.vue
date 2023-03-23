<template>
  <div class="field-container" :style="{ width }">
    <span v-show="label" class="field-container__label-area">
      <label class="field-container__label">{{ label }}</label>
      <span v-if="required" class="field-container__required">※</span>
    </span>
    <slot />
  </div>
</template>

<script setup lang="ts">
type Props = {
  label: string;
  required?: boolean;
  width?: string;
};

withDefaults(defineProps<Props>(), {
  label: '',
  required: false,
  width: '',
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.field-container {
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
}

.field-container__label-area {
  display: flex;
  gap: 2px;
  align-items: flex-start;
}

.field-container__label {
  @include \.font-component-label-x-small;
  color: $color-content-text--light;
  margin: 0;
}

.field-container__required {
  @include \.font-component-required;
  color: $color-content-error--main;
  margin-top: -2px;
}
</style>
