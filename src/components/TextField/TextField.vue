<template>
  <div :class="componentClass" :style="{ width }">
    <div v-show="icon && !multiLine" class="text-field__icon">
      <Icon :icon="icon" :size="iconSize" />
    </div>
    <textarea
      v-if="multiLine"
      v-model="value"
      class="text-field__textarea"
      :style="{ height: multiLineHeight }"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @focus="onFocus"
      @blur="onBlur"
    >
    </textarea>
    <input
      v-else-if="inputType === 'number'"
      v-model="value"
      class="text-field__input"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :max="maxNumber"
      :min="minNumber"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
    />
    <input
      v-else
      v-model="value"
      class="text-field__input"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import Icon from '../Icon/Icon.vue';

type Props = {
  modelValue?: string | number;
  disabled?: boolean;
  placeholder?: string;
  icon?: string;
  iconPosition?: 'right' | 'left';
  inputType?: string;
  inputStatus?: 'error' | 'success' | '';
  isFullWidth?: boolean;
  width?: string;
  multiLine?: boolean;
  multiLineHeight?: string;
  error?: boolean;
  readonly?: boolean;
  size?: 'normal' | 'large';
  maxLength?: number;
  maxNumber?: number;
  minNumber?: number;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  icon: '',
  iconPosition: 'left',
  inputType: 'text',
  inputStatus: '',
  width: '',
  size: 'normal',
  multiLineHeight: '110px',
  maxLength: 255,
  maxNumber: 999,
  minNumber: 0,
});

const validNum = ref<number | undefined>(undefined);

const emit =
  defineEmits<{
    (event: 'update:modelValue', value: string | number): void;
    (event: 'focus', e: Event): void;
    (event: 'blur', e: Event): void;
    (event: 'input', validNum: number | undefined): void;
  }>();

const componentClass = computed(() => {
  const withIconClass = props.icon ? ['text-field--with-icon'] : [];
  const iconPositionClass = props.iconPosition
    ? [`text-field--icon-${props.iconPosition}`]
    : [];
  const fullWidthClass = props.isFullWidth ? ['text-field--full-width'] : [];
  const statusClass = props.inputStatus
    ? [`text-field--${props.inputStatus}`]
    : [];
  const errorClass = props.error ? ['text-field--error'] : [];
  const sizeClass =
    props.size === 'large'
      ? ['text-field__input--large']
      : ['text-field__input--normal'];
  return [
    'text-field',
    ...fullWidthClass,
    ...withIconClass,
    ...iconPositionClass,
    ...statusClass,
    ...errorClass,
    ...sizeClass,
  ].join(' ');
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const onFocus = (event: Event) => {
  emit('focus', event);
};

const onBlur = (event: Event) => {
  emit('blur', event);
};

const onInput = () => {
  if (props.modelValue > props.maxNumber) {
    validNum.value = props.maxNumber;
  }
  if (props.modelValue < props.minNumber) {
    validNum.value = props.minNumber;
  }
  if (Number.isInteger(validNum.value)) {
    emit('input', validNum.value);
    validNum.value = undefined;
  }
};

const iconSize = computed(() => {
  if (props.size === 'large') {
    return 20;
  }
  if (props.size === 'normal') {
    return 16;
  }
  return 16;
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.text-field {
  position: relative;
  display: inline-block;
}

.text-field__input {
  @include \.font-component-label-large;
  color: $color-content-text--main;
  background-color: $color-background-neutral--light-02;
  border-color: $color-border-neutral--input;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  width: 100%;
}

.text-field__input--normal input {
  padding: 7px 8px;
  height: 32px;
}

.text-field__input--large input {
  padding: 8px;
  height: 40px;
}

.text-field__input:focus {
  border-color: $color-border-neutral--light;
  outline: 0;
}

.text-field__input:hover {
  border-color: $color-border-neutral--light;
}

.text-field__input::placeholder {
  color: $color-content-text--placeholder;
}

.text-field__input:disabled {
  color: $color-content-neutral--disable;
  background-color: $color-background-neutral--disable;
  border-color: $color-content-neutral--disable;
  pointer-events: none;
}

.text-field__icon {
  position: absolute;
  display: flex;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
}

.text-field--icon-right .text-field__icon {
  left: auto;
  right: 8px;
}

.text-field--with-icon .text-field__input {
  padding-left: 32px;
}

.text-field--icon-right.text-field--with-icon .text-field__input {
  padding-right: 32px;
  padding-left: 8px;
}

.text-field--success .text-field__input {
  border-color: $color-border-success--main;
}

.text-field--error .text-field__input {
  border-color: $color-border-error--dark-00;
}

.text-field__textarea {
  padding: 8px 10px;
  color: $color-content-neutral--black;
  background-color: $color-background-neutral--light-02;
  border-color: $color-border-neutral--input;
  background-color: $color-background-neutral--light-02;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  width: 100%;
  @include \.font-base;
}

.text-field__textarea:focus {
  border-color: $color-border-neutral--light;
  outline: 0;
}

.text-field__textarea:hover {
  border-color: $color-border-neutral--black;
}

.text-field__textarea::placeholder {
  color: $color-content-text--placeholder;
}

.text-field__textarea:disabled {
  color: $color-content-neutral--disable;
  background-color: $color-background-neutral--disable;
  border-color: $color-content-neutral--disable;
  pointer-events: none;
}

.text-field--success .text-field__textarea {
  border-color: $color-border-success--main;
}

.text-field--error .text-field__textarea {
  border-color: $color-border-error--main;
}

.text-field--full-width {
  width: 100%;
}

.text-field__input--large .text-field__input {
  @include \.font-component-label-large;
}

.text-field__input--normal .text-field__input {
  @include \.font-component-label-small;
}

.text-field__input--large .text-field__textarea {
  @include \.font-component-label-large;
}

.text-field__input--normal .text-field__textarea {
  @include \.font-component-label-small;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
