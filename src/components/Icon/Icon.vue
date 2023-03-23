<template>
  <span
    class="icon"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      fontSize: `${size}px`,
    }"
  >
    <span :class="iconClass" :style="{ color, fontSize: 'inherit' }">
      {{ icon }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue';

type Props = {
  icon?: string;
  type?: 'outlined' | 'filled' | 'round' | 'sharp' | 'two-tone';
  color?: string;
  size?: number;
};

const props = withDefaults(defineProps<Props>(), {
  icon: '',
  type: 'filled',
  color: 'inherit',
  size: 24,
});

const iconClass = computed(() => {
  switch (props.type) {
    case 'outlined':
      return 'material-icons-outlined';
    case 'filled':
      return 'material-icons';
    case 'round':
      return 'material-icons-round';
    case 'sharp':
      return 'material-icons-sharp';
    case 'two-tone':
      return 'material-icons-two-tone';
    default:
      return 'material-icons';
  }
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.icon {
  display: inline-block;
  font-size: 24px;
  line-height: 1;
  color: #9e9e9e;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
</style>
