<template>
  <span :class="textClass" :style="{ lineHeight, width }">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue';

type Props = {
  color?:
    | 'main'
    | 'light'
    | 'placeholder'
    | 'white'
    | 'primary'
    | 'critical'
    | 'success'
    | 'warning'
    | 'disable';
  size?:
    | '5xl'
    | '4xl'
    | '3xl'
    | '2xl'
    | 'xl'
    | 'll'
    | 'large'
    | 'base'
    | 'small'
    | 'xs'
    | '2xs';
  bold?: boolean;
  lineHeight?: string;
  noWrap?: boolean;
  width?: string;
};

const props = withDefaults(defineProps<Props>(), {
  color: 'main',
  size: 'base',
  lineHeight: '',
  width: undefined,
});

const textClass = computed(() => {
  const boldClass = props.bold ? ['text--bold'] : [];
  const colorClass = props.color ? [`text--${props.color}`] : [];
  const noWrapClass = props.noWrap ? ['text--nowrap'] : [];
  return [
    'text',
    `text--${props.size}`,
    ...boldClass,
    ...colorClass,
    ...noWrapClass,
  ].join(' ');
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.text {
  color: $color-content-text--main;
  font-weight: $font-weight-regular;
  pointer-events: none;
}

.text--bold {
  font-weight: $font-weight-bold;
}

.text--5xl {
  font-size: $font-size-5xl;
}

.text--4xl {
  font-size: $font-size-4xl;
}

.text--3xl {
  font-size: $font-size-3xl;
}

.text--2xl {
  font-size: $font-size-2xl;
}

.text--xl {
  font-size: $font-size-xl;
}

.text--ll {
  font-size: $font-size-ll;
}

.text--large {
  font-size: $font-size-large;
}

.text--base {
  font-size: $font-size-base;
}

.text--small {
  font-size: $font-size-small;
}

.text--xs {
  font-size: $font-size-xs;
}

.text--2xs {
  font-size: $font-size-2xs;
}

.text--main {
  color: $color-content-text--main;
}

.text--light {
  color: $color-content-text--light;
}

.text--placeholder {
  color: $color-content-text--placeholder;
}

.text--white {
  color: $color-content-text--white;
}

.text--primary {
  color: $color-content-text--primary;
}

.text--critical {
  color: $color-content-text--critical;
}

.text--success {
  color: $color-content-text--success;
}

.text--warning {
  color: $color-content-text--warning;
}

.text--disable {
  color: $color-content-text--disable;
}

.text--nowrap {
  white-space: nowrap;
}
</style>
