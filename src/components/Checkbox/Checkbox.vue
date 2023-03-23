<template>
  <label :class="componentClass">
    <input
      :checked="checked"
      type="checkbox"
      class="checkbox__input"
      :disabled="disabled"
      :indeterminate="indeterminate"
      @input="onInput"
    />
    <span v-show="label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    checked: boolean;
    label?: string;
    disabled?: boolean;
    background?: boolean;
    indeterminate?: boolean;
  }>(),
  {
    checked: false,
    label: '',
    disabled: false,
    background: false,
    indeterminate: false,
  }
);

const emits = defineEmits(['update:checked']);

const componentClass = computed(() => {
  const disabledClass = props.disabled ? ['checkbox--disabled'] : [];
  const backgroundClass = props.background ? ['checkbox--background'] : [];
  return ['checkbox', ...disabledClass, ...backgroundClass].join(' ');
});

function onInput(event: Event) {
  emits('update:checked', (event.target as HTMLInputElement).checked);
}
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.checkbox {
  display: inline-flex;
  cursor: pointer;
  margin-bottom: 0;
  align-items: center;
  gap: 8px;
}

.checkbox--background {
  background-color: $color-background-neutral--light-01;
  border-radius: 4px;
  padding: 7px;
}

.checkbox--background span {
  color: $color-content-primary--main;
}

.checkbox--background .checkbox__input {
  background: transparent;
}

.checkbox--disabled {
  pointer-events: none;
}

.checkbox__input {
  appearance: none;
  background-color: transparent;
  border-width: 2px;
  height: 19px;
  width: 19px;
  border-radius: 3px;
  position: relative;
  border-color: $color-content-neutral--light-01;
  border-style: solid;
  cursor: pointer;
  flex-shrink: 0;
}

.checkbox__input:hover {
  border-color: $color-content-neutral--main;
}

.checkbox__input:checked {
  border-color: $color-content-neutral--main;
  background-color: $color-content-neutral--main;
}

.checkbox__input:checked::after {
  content: '';
  transform: rotate(-45deg);
  border-bottom-width: 2px;
  height: 7px;
  width: 13px;
  display: block;
  position: absolute;
  top: 2px;
  left: 1px;
  border-bottom-color: #fff;
  border-bottom-style: solid;
  border-left-color: #fff;
  border-left-width: 2px;
  border-left-style: solid;
}

.checkbox__input:indeterminate {
  border-color: $color-content-neutral--main;
  background-color: $color-content-neutral--main;
}

.checkbox__input:indeterminate::after {
  content: '';
  position: absolute;
  border-bottom-width: 2px;
  width: 10px;
  display: block;
  top: calc(50% - 1px);
  left: calc(50% - 5px);
  border-bottom-style: solid;
  border-bottom-color: #fff;
}

.checkbox__input:disabled {
  border-color: $color-border-neutral--divider-light;
}

.checkbox__input:disabled:checked {
  border-color: $color-border-neutral--divider-light;
  background-color: $color-border-neutral--divider-light;
}

.checkbox__input:disabled:indeterminate {
  border-color: $color-border-neutral--divider-light;
  background-color: $color-border-neutral--divider-light;
}
</style>
