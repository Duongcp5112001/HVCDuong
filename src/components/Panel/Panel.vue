<template>
  <div :class="panelClass" :style="{ width, minWidth, height, minHeight }">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { withDefaults, computed } from 'vue';

type Props = {
  color?: 'dark' | 'light';
  borderRadius?: 'default' | 'small';
  padding?: 'default' | 'short' | 'wide';
  shadow?: boolean;
  width?: string;
  minWidth?: string;
  height?: string;
  minHeight?: string;
  scrollY?: boolean;
  scrollX?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  color: 'light',
  shadow: true,
  width: '',
  minWidth: '',
  height: '',
  minHeight: '',
  borderRadius: 'default',
  padding: 'default',
});

const panelClass = computed(() => {
  const colorClass = [`panel--${props.color}`];
  const borderClass = [`panel--${props.borderRadius}-border-radius`];
  const paddingClass = [`panel--${props.padding}-padding`];
  const shadowClass = props.shadow ? ['panel--shadow'] : '';
  const scrollYClass = props.scrollY ? ['panel--scroll-y'] : '';
  const scrollXClass = props.scrollX ? ['panel--scroll-x'] : '';
  return [
    'panel',
    ...colorClass,
    ...borderClass,
    ...paddingClass,
    ...shadowClass,
    ...scrollYClass,
    ...scrollXClass,
  ].join(' ');
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.panel {
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.panel--dark {
  background: $color-background-neutral--light-01;
}

.panel--light {
  background: $color-background-neutral--white;
}

.panel--default-border-radius {
  border-radius: 8px;
}

.panel--small-border-radius {
  border-radius: 4px;
}

.panel--default-padding {
  padding: 16px;
}

.panel--short-padding {
  padding: 4px 16px;
}

.panel--wide-padding {
  padding: 32px;
}

.panel--shadow {
  box-shadow: $shadow-panel-1;
}

.panel--scroll-y {
  overflow-y: scroll;
}

.panel--scroll-x {
  overflow-x: scroll;
}
</style>
