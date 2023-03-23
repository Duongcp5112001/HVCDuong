<template>
  <div>
    <div
      ref="tooltipRef"
      :class="tooltipContainerClass"
      @mouseenter="onMouseEnter"
      @mouseleave="isOpen = false"
    >
      <slot />
    </div>
    <div
      v-if="isOpen && !disabled"
      :class="tooltipClass"
      :style="toolTipLocationStyles"
    >
      <slot name="toolTipContent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults, ref, StyleValue } from 'vue';

const isOpen = ref(false);
const tooltipRef = ref<HTMLElement>();
const rect = ref<DOMRect>();

type Props = {
  direction?: 'top' | 'right' | 'bottom' | 'left';
  disabled?: boolean;
  hasPointer?: boolean;
  aligned?: 'left' | 'center' | 'right';
  contentAlign?: 'left' | 'center' | 'right';
  noContainer?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  direction: 'top',
  disabled: false,
  hasPointer: true,
  aligned: 'center',
  contentAlign: 'left',
});

const tooltipContainerClass = computed(() => {
  const alignClass = props.contentAlign
    ? [`tooltip-container--align-${props.contentAlign}`]
    : [];
  return ['tooltip-container', ...alignClass].join(' ');
});

const tooltipClass = computed(() => {
  const directionClass = [`tooltip--${props.direction}`];
  const pointerClass = props.hasPointer ? ['tooltip--has-pointer'] : [];
  const noContainerClass = props.noContainer ? ['tooltip--no-container'] : [];
  return [
    'tooltip',
    ...directionClass,
    ...pointerClass,
    ...noContainerClass,
  ].join(' ');
});

const onMouseEnter = (event: MouseEvent) => {
  isOpen.value = true;
  const target = event.target as HTMLElement;
  rect.value = target.getBoundingClientRect();
};

const toolTipLocationStyles = computed(() => {
  if (!rect.value) {
    return;
  }
  const positioningStyles: StyleValue = {};
  const spacing = 4;
  const pointerWidth = props.hasPointer ? 5 : 0;

  const alignedTranslateX =
    props.aligned === 'right'
      ? `translateX(-75%)`
      : props.aligned === 'left'
      ? `translateX(-25%)`
      : `translateX(-50%)`;

  switch (props.direction) {
    case 'top':
      positioningStyles.top = `${rect.value.top - spacing - pointerWidth}px`;
      positioningStyles.left = `${rect.value.left + rect.value.width / 2}px`;
      positioningStyles.transform = `translateY(-100%) ${alignedTranslateX}`;
      return positioningStyles;
    case 'bottom':
      positioningStyles.top = `${rect.value.bottom + spacing + pointerWidth}px`;
      positioningStyles.left = `${rect.value.left + rect.value.width / 2}px`;
      positioningStyles.transform = `${alignedTranslateX}`;
      return positioningStyles;
    case 'left':
      positioningStyles.top = `${rect.value.top + rect.value.height / 2}px`;
      positioningStyles.left = `${rect.value.left - spacing - pointerWidth}px`;
      positioningStyles.transform = `translateX(-100%) translateY(-50%)`;
      return positioningStyles;
    case 'right':
      positioningStyles.top = `${rect.value.top + rect.value.height / 2}px`;
      positioningStyles.left = `${
        rect.value.left + rect.value.width + spacing + pointerWidth
      }px`;
      positioningStyles.transform = `translateY(-50%)`;
      return positioningStyles;
    default:
      return positioningStyles;
  }
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.tooltip-container {
  position: relative;
  width: auto;
  vertical-align: middle;
  display: flex;
}

.tooltip {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: auto;
  overflow: visible;
  background-color: $color-background-neutral--black;
  border-color: transparent;
  border-radius: 4px;
  position: fixed;
  z-index: 20;
  padding: 4px 8px;
  color: $color-content-neutral--white;
  font-size: $font-size-2xs;
  font-weight: $font-weight-bold;
  text-align: left;
}

.tooltip.tooltip--has-pointer ::after {
  position: absolute;
  content: '';
  border-width: 5px;
  border-color: transparent;
  border-style: solid;
}

.tooltip--bottom.tooltip--has-pointer ::after {
  top: -10px;
  left: 50%;
  margin-left: -5px;
  border-bottom-color: $color-background-neutral--black;
}

.tooltip--top.tooltip--has-pointer ::after {
  top: 99.8%;
  left: 50%;
  margin-left: -5px;
  border-top-color: $color-background-neutral--black;
}

.tooltip--right.tooltip--has-pointer ::after {
  top: 50%;
  right: 100%;
  margin-top: -5px;
  border-right-color: $color-background-neutral--black;
}

.tooltip--left.tooltip--has-pointer ::after {
  top: 50%;
  left: 99.8%;
  margin-top: -5px;
  border-left-color: $color-background-neutral--black;
}

.tooltip-container--align-left {
  justify-content: flex-start;
}

.tooltip-container--align-center {
  justify-content: center;
}

.tooltip-container--align-right {
  justify-content: flex-end;
}

.tooltip.tooltip--no-container {
  padding: 0px;
  background: transparent;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
}
</style>
