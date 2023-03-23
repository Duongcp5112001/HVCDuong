<template>
  <div class="table-container-detached util-mb-8">
    <table class="table-detached">
      <tbody class="table-detached-body">
        <slot />
      </tbody>
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
  disabledRowsIds,
  criticalColumnsIds,
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

.table-detached {
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  width: fit-content;
  border-top-color: $color-border-neutral--outline;
  border-top-style: solid;
  border-top-width: 1px;
}

.table-detached-body :deep(.table__cell) {
  height: 40px;
  padding: 0 8px;
  color: $color-content-neutral--black;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: $color-border-neutral--outline;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: $color-border-neutral--outline;
}

.table-detached-body :deep(.table__cell:last-child) {
  border-right: none;
}

.table-detached-body :deep(.table__row:nth-child(odd)) {
  background-color: $color-background-neutral--white;
}

.table-detached-body :deep(.table__row:nth-child(even)) {
  background-color: $color-background-neutral--light-02;
}

.table-detached-body :deep(.table__row:hover) {
  background-color: $color-background-primary--light-01;
}

.table tbody :deep(.table__row:last-child .table__cell) {
  border-bottom: none;
}
</style>
