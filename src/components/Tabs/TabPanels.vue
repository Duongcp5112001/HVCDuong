<template>
  <div class="py-8 rounded-bl-md rounded-br-md overflow-hidden">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed } from 'vue';

const props = withDefaults(
  defineProps<{
    selectedIndex: string | number;
  }>(),
  {
    selectedIndex: '',
  }
);

provide('tabsPanelState', {
  active: computed(() => props.selectedIndex),
  panels: ref([]),
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';
</style>
