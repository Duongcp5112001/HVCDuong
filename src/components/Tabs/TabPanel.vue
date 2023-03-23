<template>
  <div v-if="isActive">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import {
  inject,
  getCurrentInstance,
  watchEffect,
  computed,
  ComputedRef,
  Ref,
} from 'vue';

const instance = getCurrentInstance();
const { panels, active } = inject('tabsPanelState') as {
  panels: Ref<Array<{ uid: number }>>;
  active: ComputedRef<string | number | undefined>;
};
const index = computed(() =>
  panels.value.findIndex((target) => target.uid === instance?.uid)
);

const isActive = computed(() => active.value === index.value);

watchEffect(() => {
  if (index.value === -1 && instance) {
    panels.value.push(instance);
  }
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';
</style>
