<template>
  <div class="table-container-detached table-container-detached--header">
    <table class="table-detached">
      <thead class="table-detached-head">
        <slot />
      </thead>
    </table>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, provide, computed } from 'vue';

type Props = {
  selectedRowsIds?: string[];
  criticalColumnsIds?: string[];
  disabledRowsIds?: string[];
};

const props = withDefaults(defineProps<Props>(), {
  selectedRowsIds: () => [],
  criticalColumnsIds: () => [],
  disabledRowsIds: () => [],
});

const selectedRowsIds = computed(() => props.selectedRowsIds);
const disabledRowsIds = computed(() => props.disabledRowsIds);
const criticalColumnsIds = computed(() => props.criticalColumnsIds);

provide('tableState', {
  selectedRowsIds,
  criticalColumnsIds,
  disabledRowsIds,
});
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.table-container-detached {
  overflow: auto;
  width: '100%';
  border-left-color: $color-border-neutral--outline;
  border-left-style: solid;
  border-left-width: 1px;
}

.table-container-detached--header {
  position: sticky;
  top: -16px;
  z-index: 5;
}

.table-detached {
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  width: fit-content;
  border-top-color: $color-border-neutral--outline;
  border-top-style: solid;
  border-top-width: 1px;
}

.table-detached-head {
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: $color-border-neutral--outline;
  width: 100%;
}

.table-detached-head :deep(.table__cell) {
  height: 43px;
  padding: 0 8px;
  color: $color-content-text--main;
  background: $color-background-neutral--light-01;
  border-bottom-width: 3px;
  border-bottom-style: solid;
  border-bottom-color: $color-border-neutral--outline;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: $color-border-neutral--outline;
}

.table-detached-head :deep(.table__cell-inner) {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}
</style>
