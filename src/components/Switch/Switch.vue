<template>
  <label :class="disabled ? 'switch--disabled' : ''" class="switch">
    <span v-if="hasLabel && labelPosition === 'left'" class="switch__label">
      <slot />
    </span>
    <div class="switch__input-wrapper">
      <input
        type="checkbox"
        class="switch__input"
        :disabled="disabled"
        :checked="checked"
      />
      <label class="switch__input-label" />
    </div>
    <span v-if="hasLabel && labelPosition === 'right'" class="switch__label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

type Props = {
  disabled?: boolean;
  checked?: boolean;
  labelPosition?: 'right' | 'left';
};

withDefaults(defineProps<Props>(), {
  disabled: false,
  checked: false,
  labelPosition: 'right',
});
const slots = useSlots();

const hasLabel = computed(() => slots.default && slots.default().length > 0);
</script>

<style scoped lang="scss">
@import '../../scss/variables';
@import '../../scss/mixins';

.switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin: 0;
  padding: 6px 0;
}

.switch--disabled {
  pointer-events: none;
}

.switch__input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 180px;
  height: 20px;
  width: 24px;
}

.switch__input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  opacity: 0;
  cursor: pointer;
}

.switch__input-label {
  width: 24px;
  height: 14px;
  background: $color-content-neutral--light-01;
  position: relative;
  border-radius: 180px;
  transition: 0.4s;
  box-sizing: border-box;
  margin-bottom: 0px;
}

.switch__input-label:after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  left: 2px;
  top: 2px;
  z-index: 2;
  background: $color-content-neutral--white;
  transition: 150ms;
}

.switch--disabled .switch__input-label {
  background-color: $color-border-neutral--divider-light;
}

.switch__input:checked + .switch__input-label {
  background-color: $color-background-neutral--main;
}

.switch--disabled .switch__input:checked + .switch__input-label {
  background-color: $color-border-neutral--divider-light;
}

.switch__input:checked + .switch__input-label:after {
  left: 12px;
}

.switch__label {
  margin: 0px;
  color: $color-content-neutral--main;
}

.switch--disabled .switch__label {
  color: $color-border-neutral--divider-light;
}
</style>
