<template>
  <div class="tabs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, computed, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    selectedIndex: string | number;
  }>(),
  {
    selectedIndex: '',
  }
);

const emits = defineEmits(['change']);

const active = computed(() => props.selectedIndex);
const tabs = ref<Array<{ uid: number }>>([]);

function selectTab(tab: string | number) {
  emits('change', tab);
}

provide('tabsState', {
  active,
  tabs,
  selectTab,
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.tabs {
  display: flex;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: $color-border-neutral--light;
}

.tabs--vertical {
  flex-direction: column;
  margin-bottom: 20px;
}
</style>
