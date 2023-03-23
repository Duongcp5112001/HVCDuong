<template>
  <label :class="radioButtonClass">
    <input
      :checked="checked"
      type="radio"
      class="radio__input"
      :disabled="disabled"
      :name="name"
      @input="onInput"
      :class="{selected: props.checked}"
    />
    <span v-if="label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Props = {
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  background?: boolean;
  name?: string;
};

const props = withDefaults(defineProps<Props>(), {
  label: '',
  name: '',
  className: '',
  checked: false,
});

const emits = defineEmits(['update:checked']);

const radioButtonClass = computed(() => {
  const disabledClass = props.disabled ? ['radio--disabled'] : [];
  const backgroundClass = props.background ? ['radio--background'] : [];
  return ['radio', ...disabledClass, ...backgroundClass].join(' ');
});

function onInput(event: Event) {
  emits('update:checked', (event.target as HTMLInputElement).checked);
}
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.radio {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 0;
  cursor: pointer;
}

.radio--background {
  background-color: $color-background-neutral--light-01;
  border-radius: 4px;
  padding: 7px;
}

.radio--background span {
  color: $color-content-primary--main;
}

.radio--background .radio__input {
  background: transparent;
}

.radio--disabled {
  pointer-events: none;
}

.radio__input {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border-width: 2px;
  border-style: solid;
  border-color: $color-content-neutral--light-00;
  background-color: transparent;
  position: relative;
  cursor: pointer;
  margin: 2px;
}

.selected {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border-width: 2px;
  border-style: solid;
  border-color: $color-content-neutral--main;
  background-color: transparent;
  position: relative;
  cursor: pointer;
  margin: 2px;
}

.selected:after {
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: $color-content-neutral--main;
  border-color: $color-content-neutral--main;
  position: absolute;
  top: calc(50% - 5px);
  left: calc(50% - 5px);
}

.radio__input:hover {
  border-color: $color-content-neutral--main;
}

.radio__input:checked {
  border-color: $color-content-neutral--main;
}

.radio__input:checked::after {
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: $color-content-neutral--main;
  position: absolute;
  top: calc(50% - 5px);
  left: calc(50% - 5px);
}

.radio__input:disabled {
  border-color: $color-border-neutral--divider-light;
}

.radio__input:disabled:checked {
  border-color: $color-border-neutral--divider-light;
}

.radio__input:disabled:checked::after {
  background-color: $color-border-neutral--divider-light;
}
</style>
