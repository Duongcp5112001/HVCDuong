<template>
  <button
    :class="buttonClass"
    :disabled="disabled"
    :style="{ width }"
    @click="onClick"
  >
    <Icon
      v-if="icon && iconPosition === 'left'"
      :icon="icon"
      :size="iconSize"
    />
    <span v-if="slots.default" class="btn__content">
      <slot />
    </span>
    <Icon
      v-if="icon && iconPosition === 'right'"
      :icon="icon"
      :size="iconSize"
    />
  </button>
</template>

<script setup lang="ts">
import { useSlots, computed, withDefaults } from 'vue';
import Icon from '../Icon/Icon.vue';

const slots = useSlots();

type Props = {
  color?: 'primary' | 'critical' | 'neutral';
  type?: 'contained' | 'outlined' | 'text';
  shape?: 'square' | 'circle';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  iconPosition?: 'right' | 'left';
  disabled?: boolean;
  width?: string;
  jointEnd?: 'right' | 'left' | 'both';
};

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  type: 'contained',
  shape: 'square',
  size: 'medium',
  icon: '',
  iconPosition: 'left',
  width: '',
  jointEnd: undefined,
});

const emit = defineEmits<{ (event: 'click'): void }>();

const buttonClass = computed(() => {
  const colorClass = [`btn--${props.color}`];
  const typeClass = [`btn--${props.type}`];
  const sizeClass = [`btn--${props.size}`];
  const shapeClass = [`btn--${props.shape}`];
  const iconOnlyClass = !slots.default ? [`btn--icon-only`] : [];
  const jointClass = props.jointEnd ? [`btn--joint-${props.jointEnd}`] : [];
  return [
    'btn',
    ...colorClass,
    ...typeClass,
    ...sizeClass,
    ...shapeClass,
    ...iconOnlyClass,
    ...jointClass,
  ].join(' ');
});

const iconSize = computed(() => {
  if (props.size === 'large') {
    return 24;
  }
  if (props.size === 'medium') {
    return 20;
  }
  return 16;
});

const onClick = () => {
  emit('click');
};
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 6px;
  cursor: pointer;
  border-color: transparent;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  white-space: nowrap;
}

.btn:disabled {
  pointer-events: none;
  box-shadow: none;
}

.btn--large {
  @include \.font-component-label-large;
  height: 40px;
  padding: 8px;
}

.btn--medium {
  @include \.font-component-label-medium;
  height: 32px;
  padding: 6px;
}

.btn--small {
  @include \.font-component-label-small;
  height: 24px;
  padding: 4px;
}

.btn:active {
  box-shadow: none;
}

.btn:focus {
  outline: 0;
}

.btn__content {
  display: flex;
  align-items: center;
  padding: 0px 8px;
}

.btn--circle.btn--small {
  border-radius: 15px;
}

.btn--circle.btn--medium {
  border-radius: 18px;
}

.btn--circle.btn--large {
  border-radius: 21px;
}

.btn--icon-only.btn--small {
  width: 24px;
}

.btn--icon-only.btn--medium {
  width: 32px;
}

.btn--icon-only.btn--large {
  width: 40px;
}

.btn--joint-right {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.btn--joint-left {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.btn--joint-both {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.btn--contained {
  color: $color-content-text--white;
  box-shadow: none;
}

.btn--contained :deep(.icon) {
  color: $color-content-neutral--white;
}

.btn:disabled :deep(.icon) {
  color: $color-content-neutral--white;
}

.btn--outlined {
  background-color: $color-background-neutral--white;
}

.btn--text {
  background-color: transparent;
  box-shadow: none;
}

.btn--contained.btn--primary {
  background-color: $color-background-primary--main;
  border-color: $color-background-primary--main;
}

.btn--contained.btn--primary:hover {
  background-color: $color-background-primary--hover;
  border-color: $color-background-primary--hover;
}

.btn--contained.btn--primary:active {
  background-color: $color-background-primary--selected;
  border-color: $color-background-primary--selected;
}

.btn--contained.btn--primary:disabled {
  color: $color-content-text--white;
  background-color: $color-background-neutral--disable;
  border-color: $color-background-neutral--disable;
}

.btn--contained.btn--primary:disabled :deep(.icon) {
  color: $color-content-neutral--white;
}

.btn--contained.btn--critical {
  background-color: $color-background-error--main;
  border-color: $color-background-error--main;
}

.btn--contained.btn--critical:hover {
  background-color: $color-background-error--hover;
  border-color: $color-background-error--hover;
}

.btn--contained.btn--critical:active {
  background-color: $color-background-error--selected;
  border-color: $color-background-error--selected;
}

.btn--contained.btn--critical:disabled {
  color: $color-content-text--white;
  background-color: $color-background-neutral--disable;
  border-color: $color-background-neutral--disable;
}

.btn--contained.btn--critical:disabled :deep(.icon) {
  color: $color-content-neutral--white;
}

.btn--contained.btn--neutral {
  background-color: $color-background-neutral--main;
  border-color: $color-background-neutral--main;
}

.btn--contained.btn--neutral:hover {
  background-color: $color-background-neutral--hover;
  border-color: $color-background-neutral--hover;
}

.btn--contained.btn--neutral:active {
  background-color: $color-background-neutral--selected;
  border-color: $color-background-neutral--selected;
}

.btn--contained.btn--neutral:disabled {
  color: $color-content-text--white;
  background-color: $color-background-neutral--disable;
  border-color: $color-background-neutral--disable;
}

.btn--contained.btn--neutral:disabled :deep(.icon) {
  color: $color-content-neutral--white;
}

.btn--outlined.btn--primary {
  color: $color-content-text--primary;
  border-color: $color-border-primary--main;
}

.btn--outlined.btn--primary:hover {
  background-color: $color-background-primary--light-01;
}

.btn--outlined.btn--primary:active {
  background-color: $color-background-primary--light-00;
  border-color: $color-background-primary--main;
}

.btn--outlined.btn--primary:disabled {
  color: $color-content-text--disable;
  border-color: $color-border-neutral--disable;
}

.btn--outlined.btn--primary :deep(.icon) {
  color: $color-content-primary--main;
}

.btn--outlined.btn--primary:disabled :deep(.icon) {
  color: $color-content-neutral--disable;
}

.btn--outlined.btn--critical {
  color: $color-content-text--critical;
  border-color: $color-border-error--main;
}

.btn--outlined.btn--critical:hover {
  background-color: $color-background-error--light-01;
}

.btn--outlined.btn--critical:active {
  background-color: $color-background-error--light-00;
  border-color: $color-background-error--main;
}

.btn--outlined.btn--critical:disabled {
  color: $color-content-text--disable;
  border-color: $color-border-neutral--disable;
}

.btn--outlined.btn--critical :deep(.icon) {
  color: $color-content-error--main;
}

.btn--outlined.btn--critical:disabled :deep(.icon) {
  color: $color-content-neutral--disable;
}

.btn--outlined.btn--neutral {
  color: $color-content-text--main;
  border-color: $color-border-neutral--main;
}

.btn--outlined.btn--neutral:hover {
  background-color: $color-background-neutral--light-01;
}

.btn--outlined.btn--neutral:active {
  background-color: $color-background-neutral--light-00;
  border-color: $color-background-neutral--main;
}

.btn--outlined.btn--neutral:disabled {
  color: $color-content-text--disable;
  border-color: $color-border-neutral--disable;
}

.btn--outlined.btn--neutral :deep(.icon) {
  color: $color-content-neutral--main;
}

.btn--outlined.btn--neutral:disabled :deep(.icon) {
  color: $color-content-neutral--disable;
}

.btn--text.btn--primary {
  color: $color-content-text--primary;
}

.btn--text.btn--primary:hover {
  background-color: $color-background-primary--light-01;
}

.btn--text.btn--primary:active {
  background-color: $color-background-primary--light-00;
}

.btn--text.btn--primary:disabled {
  color: $color-content-text--disable;
}

.btn--text.btn--primary :deep(.icon) {
  color: $color-content-text--primary;
}

.btn--text.btn--primary:disabled :deep(.icon) {
  color: $color-content-neutral--disable;
}

.btn--text.btn--critical {
  color: $color-content-text--critical;
}

.btn--text.btn--critical:hover {
  background-color: $color-background-error--light-01;
}

.btn--text.btn--critical:active {
  background-color: $color-background-error--light-00;
}

.btn--text.btn--critical:disabled {
  color: $color-content-text--disable;
}

.btn--text.btn--critical :deep(.icon) {
  color: $color-content-text--critical;
}

.btn--text.btn--critical:disabled :deep(.icon) {
  color: $color-content-neutral--disable;
}

.btn--text.btn--neutral {
  color: $color-content-text--main;
}

.btn--text.btn--neutral:hover {
  background-color: $color-background-neutral--light-01;
}

.btn--text.btn--neutral:active {
  background-color: $color-background-neutral--light-00;
}

.btn--text.btn--neutral:disabled {
  color: $color-content-text--disable;
}

.btn--text.btn--neutral :deep(.icon) {
  color: $color-content-text--main;
}

.btn--text.btn--neutral:disabled :deep(.icon) {
  color: $color-content-neutral--disable;
}
</style>
