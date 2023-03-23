<template>
  <span v-if="counter" :class="badgeCounterClass">
    {{ counter > 99 ? '99+' : counter }}
  </span>
  <span v-else :class="badgeClass" :style="{ width }">
    <Icon v-if="icon" :icon="icon || ''" :size="iconSize" />
    <CustomIcon
      v-else-if="customIcon"
      :icon="customIcon"
      :size="iconSize"
      :color="customIconColor"
    />
    <span class="badge__content"><slot /></span>
  </span>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue';
import Icon from '../Icon/Icon.vue';
import CustomIcon from '../CustomIcon/CustomIcon.vue';

type Props = {
  color?:
    | 'primary'
    | 'error'
    | 'success'
    | 'neutral'
    | 'neutral-faded'
    | 'warning'
    | 'information'
    | 'slot01'
    | 'slot02'
    | 'slot03'
    | 'slot04'
    | 'slot05'
    | 'slot06'
    | 'slot07'
    | 'slot08'
    | 'slot09'
    | 'slot10';
  type?: 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  customIcon?: string;
  counter?: number;
  width?: string;
};

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  type: 'contained',
  size: 'medium',
  icon: '',
  customIcon: '',
  counter: 0,
  width: '',
});

const isSlotColors = computed(() => {
  return (
    props.color === 'slot01' ||
    props.color === 'slot02' ||
    props.color === 'slot03' ||
    props.color === 'slot04' ||
    props.color === 'slot05' ||
    props.color === 'slot06' ||
    props.color === 'slot07' ||
    props.color === 'slot08' ||
    props.color === 'slot09' ||
    props.color === 'slot10'
  );
});

const badgeCounterClass = computed(() => {
  const colorClass = isSlotColors.value
    ? [`badge-counter--primary`]
    : [`badge-counter--${props.color}`];
  return ['badge-counter', ...colorClass].join(' ');
});

const badgeClass = computed(() => {
  const colorClass =
    props.type === 'contained' && isSlotColors.value
      ? [`badge--${props.color}`]
      : !isSlotColors.value
      ? [`badge--${props.color}`]
      : [`badge--primary`];
  const typeClass = [`badge--${props.type}`];
  const sizeClass = [`badge--${props.size}`];
  return ['badge', ...colorClass, ...typeClass, ...sizeClass].join(' ');
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

const customIconColor = computed(() => {
  if (props.type === 'contained') {
    return '#ffffff';
  }
  if (props.color === 'primary') {
    return '#0061a3';
  }
  if (props.color === 'error') {
    return '#ba1a1a';
  }
  if (props.color === 'success') {
    return '#236c2d';
  }
  if (props.color === 'neutral') {
    return '#313131';
  }
  if (props.color === 'neutral-faded') {
    return '#bcbcbc';
  }
  if (props.color === 'warning') {
    return '#ffa800';
  }
  if (props.color === 'information') {
    return '#2196f3';
  }
  return '#ffffff';
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.badge-counter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  min-width: 20px;
  padding: 2px;
  border-color: transparent;
  border-style: solid;
  border-width: 1px;
  border-radius: 20px;
  @include \.font-component-label-small;
  color: $color-content-neutral--white;
}

.badge-counter.badge-counter--primary {
  background-color: $color-background-primary--main;
  border-color: $color-background-primary--main;
}

.badge-counter.badge-counter--error {
  background-color: $color-background-error--main;
  border-color: $color-background-error--main;
}

.badge-counter.badge-counter--success {
  background-color: $color-background-success--main;
  border-color: $color-background-success--main;
}

.badge-counter.badge-counter--warning {
  background-color: $color-background-warning--main;
  border-color: $color-background-warning--main;
}

.badge-counter.badge-counter--neutral {
  background-color: $color-background-neutral--main;
  border-color: $color-background-neutral--main;
}

.badge-counter.badge-counter--neutral-faded {
  background-color: $color-background-neutral--disable;
  border-color: $color-background-neutral--disable;
}

.badge-counter.badge-counter--information {
  background-color: $color-background-information--main;
  border-color: $color-background-information--main;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 85px;
  padding: 6px;
  border-color: transparent;
  border-style: solid;
  border-width: 1px;
  border-radius: 20px;
}

.badge--large {
  @include \.font-component-label-large;
  height: 40px;
  padding: 8px;
}

.badge--medium {
  @include \.font-component-label-medium;
  height: 32px;
  padding: 6px;
}

.badge--small {
  @include \.font-component-label-small;
  height: 24px;
  padding: 4px;
}

.badge__content {
  display: flex;
  align-items: center;
  padding: 0px 8px;
}

.badge--contained {
  color: $color-content-neutral--white;
}

.badge--contained :deep(.icon) {
  color: $color-content-text--white;
}

.badge--contained.badge--primary {
  background-color: $color-background-primary--main;
  border-color: $color-background-primary--main;
}

.badge--contained.badge--error {
  background-color: $color-background-error--main;
  border-color: $color-background-error--main;
}

.badge--contained.badge--success {
  background-color: $color-background-success--main;
  border-color: $color-background-success--main;
}

.badge--contained.badge--warning {
  background-color: $color-background-warning--main;
  border-color: $color-background-warning--main;
}

.badge--contained.badge--neutral {
  background-color: $color-background-neutral--main;
  border-color: $color-background-neutral--main;
}

.badge--contained.badge--neutral-faded {
  background-color: $color-background-neutral--disable;
  border-color: $color-background-neutral--disable;
}

.badge--contained.badge--information {
  background-color: $color-background-information--main;
  border-color: $color-background-information--main;
}

.badge--contained.badge--slot01 {
  background-color: $color-slot-slot01;
  border-color: $color-slot-slot01;
  color: $color-content-text--main;
}

.badge--contained.badge--slot01 :deep(.icon) {
  color: $color-content-text--main;
}

.badge--contained.badge--slot02 {
  background-color: $color-slot-slot02;
  border-color: $color-slot-slot02;
  color: $color-content-text--main;
}

.badge--contained.badge--slot02 :deep(.icon) {
  color: $color-content-text--main;
}

.badge--contained.badge--slot03 {
  background-color: $color-slot-slot03;
  border-color: $color-slot-slot03;
  color: $color-content-text--main;
}

.badge--contained.badge--slot03 :deep(.icon) {
  color: $color-content-text--main;
}

.badge--contained.badge--slot04 {
  background-color: $color-slot-slot04;
  border-color: $color-slot-slot04;
  color: $color-content-text--main;
}

.badge--contained.badge--slot04 :deep(.icon) {
  color: $color-content-text--main;
}

.badge--contained.badge--slot05 {
  background-color: $color-slot-slot05;
  border-color: $color-slot-slot05;
  color: $color-content-text--main;
}

.badge--contained.badge--slot05 :deep(.icon) {
  color: $color-content-text--main;
}

.badge--contained.badge--slot06 {
  background-color: $color-slot-slot06;
  border-color: $color-slot-slot06;
  color: $color-content-text--main;
}

.badge--contained.badge--slot06 :deep(.icon) {
  color: $color-content-text--main;
}

.badge--contained.badge--slot07 {
  background-color: $color-slot-slot07;
  border-color: $color-slot-slot07;
  color: $color-content-text--main;
}

.badge--contained.badge--slot07 :deep(.icon) {
  color: $color-content-text--main;
}

.badge--contained.badge--slot08 {
  background-color: $color-slot-slot08;
  border-color: $color-slot-slot08;
  color: $color-content-text--main;
}

.badge--contained.badge--slot08 :deep(.icon) {
  color: $color-content-text--main;
}

.badge--contained.badge--slot09 {
  background-color: $color-slot-slot09;
  border-color: $color-slot-slot09;
  color: $color-content-text--main;
}

.badge--contained.badge--slot09 :deep(.icon) {
  color: $color-content-text--main;
}

.badge--contained.badge--slot10 {
  background-color: $color-slot-slot10;
  border-color: $color-slot-slot10;
  color: $color-content-text--main;
}

.badge--contained.badge--slot10 :deep(.icon) {
  color: $color-content-text--main;
}

.badge--outlined {
  background: $color-background-neutral--white;
}

.badge--outlined.badge--primary {
  color: $color-content-text--primary;
  border-color: $color-border-primary--main;
}

.badge--outlined.badge--primary :deep(.icon) {
  color: $color-content-primary--main;
}

.badge--outlined.badge--error {
  color: $color-content-text--critical;
  border-color: $color-border-error--main;
}

.badge--outlined.badge--error :deep(.icon) {
  color: $color-content-error--main;
}

.badge--outlined.badge--success {
  color: $color-content-text--success;
  border-color: $color-border-success--main;
}

.badge--outlined.badge--success :deep(.icon) {
  color: $color-content-success--main;
}

.badge--outlined.badge--warning {
  color: $color-content-text--warning;
  border-color: $color-border-warning--main;
}

.badge--outlined.badge--warning :deep(.icon) {
  color: $color-content-warning--dark-00;
}

.badge--outlined.badge--information {
  color: $color-content-information--main;
  border-color: $color-border-information--main;
}

.badge--outlined.badge--information :deep(.icon) {
  color: $color-content-information--main;
}

.badge--outlined.badge--neutral {
  color: $color-content-text--main;
  border-color: $color-border-neutral--light;
}

.badge--outlined.badge--neutral-faded {
  color: $color-content-text--disable;
  border-color: $color-border-neutral--disable;
}

.badge--outlined.badge--neutral :deep(.icon) {
  color: $color-content-neutral--main;
}

.badge--outlined.badge--neutral-faded :deep(.icon) {
  color: $color-content-neutral--disable;
}
</style>
