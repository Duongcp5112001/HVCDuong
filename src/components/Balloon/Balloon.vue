<template>
  <div>
    <div
      ref="balloonRef"
      class="balloon-container"
      @mouseenter="onMouseEnter"
      @mouseleave="isOpen = false"
    >
      <slot />
    </div>
    <div
      v-if="isOpen && !disabled"
      :class="balloonClass"
      :style="balloonLocationStyles"
    >
      <slot name="balloonContent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults, ref, StyleValue } from 'vue';

const isOpen = ref(false);
const balloonRef = ref<HTMLElement>();
const rect = ref<DOMRect>();

type Props = {
  direction?: 'top' | 'bottom';
  disabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  direction: 'top',
  disabled: false,
});

const balloonClass = computed(() => {
  const directionClass = [`balloon--${props.direction}`];
  return ['balloon', ...directionClass].join(' ');
});

const onMouseEnter = (event: MouseEvent) => {
  isOpen.value = true;
  const target = event.target as HTMLElement;
  rect.value = target.getBoundingClientRect();
};

const balloonLocationStyles = computed(() => {
  if (!rect.value) {
    return;
  }
  const positioningStyles: StyleValue = {};
  const spacing = 4;
  const pointerWidth = 10;

  switch (props.direction) {
    case 'top':
      positioningStyles.top = `${rect.value.top - spacing - pointerWidth}px`;
      positioningStyles.left = `${rect.value.left + rect.value.width / 2}px`;
      positioningStyles.transform = `translateY(-100%) translateX(-50%)`;
      return positioningStyles;
    case 'bottom':
      positioningStyles.top = `${rect.value.bottom + spacing + pointerWidth}px`;
      positioningStyles.left = `${rect.value.left + rect.value.width / 2}px`;
      positioningStyles.transform = `translateX(-50%)`;
      return positioningStyles;
    default:
      return positioningStyles;
  }
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.balloon-container {
  position: relative;
  width: auto;
  display: flex;
}

.balloon {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: auto;
  overflow: visible;
  background-color: $color-background-neutral--white;
  border-color: transparent;
  border-radius: 8px;
  position: fixed;
  z-index: 20;
  padding: 16px;
  text-align: left;
  box-shadow: $shadow-panel-8;
}

.balloon ::after {
  position: absolute;
  content: '';
  border-width: 10px;
  border-color: transparent;
  border-style: solid;
}

.balloon--bottom ::after {
  top: -20px;
  left: 50%;
  margin-left: -10px;
  border-bottom-color: $color-background-neutral--white;
}

.balloon--top ::after {
  top: 98%;
  left: 50%;
  margin-left: -10px;
  border-top-color: $color-background-neutral--white;
}
</style>


