<template>
  <div :class="spinnerClass">
    <svg
      :width="spinnerSize"
      :height="spinnerSize"
      :viewBox="`0 0 40 40`"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 3C29.3888 3 37 10.6112 37 20C37 29.3888 29.3888 37 20 37C10.6112 37 3 29.3888 3 20C3 17.8879 3.38517 15.8658 4.08911 14"
        stroke="#003D6C"
        stroke-width="5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue';

type Props = {
  color?: 'main' | 'white';
  size?: 'small' | 'medium' | 'large';
};

const props = withDefaults(defineProps<Props>(), {
  color: 'main',
  size: 'medium',
});

const spinnerClass = computed(() => {
  const colorClass = [`spinner--${props.color}`];
  return ['spinner', ...colorClass].join(' ');
});

const spinnerSize = computed(() => {
  switch (props.size) {
    case 'small':
      return 16;
    case 'medium':
      return 24;
    case 'large':
      return 40;
    default:
      return 40;
  }
});
</script>

<style scoped lang="scss">
@import '../../scss/variables';
@import '../../scss/mixins';

.spinner {
  display: inline-flex;
  animation: rotation 1000ms infinite linear;
}

.spinner--main svg path {
  stroke: $color-border-primary--main;
}

.spinner--white svg path {
  stroke: $color-border-neutral--white;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}
</style>
