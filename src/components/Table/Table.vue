<template>
  <div class="table-container" :style="{ width, height, maxHeight, maxWidth }">
    <table :class="tableClass" :style="{ width }">
      <colgroup v-if="slots.colgroups">
        <slot name="colgroups" />
      </colgroup>
      <thead>
        <slot name="head" />
      </thead>
      <tbody>
        <slot name="body" />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useSlots, withDefaults, computed, provide } from 'vue';

const slots = useSlots();

type Props = {
  width?: string;
  maxWidth?: string;
  height?: string;
  maxHeight?: string;
  fixedLayout?: boolean;
  selectedRowsIds?: string[];
  disabledRowsIds?: string[];
  criticalColumnsIds?: string[];
  selectionType?: 'background' | 'border';
  isTopSticky?: boolean;
  hoverEffect?: boolean;
  isStriped?: boolean;
  isCellEmphasisColor?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: 'auto',
  maxWidth: '',
  maxHeight: '',
  selectedRowsIds: () => [],
  disabledRowsIds: () => [],
  criticalColumnsIds: () => [],
  selectionType: 'background',
  isTopSticky: true,
  hoverEffect: true,
  isStriped: true,
  isCellEmphasisColor: false,
});

const tableClass = computed(() => {
  const fixedClass = props.fixedLayout ? [`table--fixed-layout`] : [];
  const selectionClass = [`table--${props.selectionType}-selection`];
  const stickyClass = props.isTopSticky ? ['table--top-sticky'] : [];
  const hoverClass = props.hoverEffect ? ['table--hover-effect'] : [];
  const stripedClass = props.isStriped ? ['table--striped'] : [];
  const cellFontClass = props.isCellEmphasisColor
    ? ['table--cell-emphasis-color']
    : [];
  return [
    'table',
    ...fixedClass,
    ...selectionClass,
    ...stickyClass,
    ...hoverClass,
    ...stripedClass,
    ...cellFontClass,
  ].join(' ');
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

.table-container {
  overflow: auto;
  border-color: $color-border-neutral--outline;
  border-style: solid;
  border-width: 1px;
}

.table {
  border-collapse: separate;
  border-spacing: 0;
  background-color: $color-background-neutral--white;
}

.table--fixed-layout {
  table-layout: fixed;
}

.table thead {
  top: 0px;
  z-index: 5;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: $color-border-neutral--outline;
}

.table--top-sticky thead {
  position: sticky;
}

.table thead :deep(.table__cell) {
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

.table thead :deep(.table__cell-inner) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.table tbody :deep(.table__cell) {
  height: 40px;
  padding: 8px;
  color: $color-content-text--main;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: $color-border-neutral--outline;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: $color-border-neutral--outline;
}

.table tbody :deep(.table__cell:last-child) {
  border-right: none;
}

.table.table--striped tbody :deep(.table__row:nth-child(odd)) {
  background-color: $color-background-neutral--white;
}

.table.table--striped tbody :deep(.table__row:nth-child(even)) {
  background-color: $color-background-neutral--light-02;
}

.table.table--hover-effect tbody :deep(.table__row:hover) {
  background-color: $color-background-primary--light-01;
}

.table.table--background-selection
  tbody
  :deep(.table__row.table__row--selected) {
  background-color: $color-background-primary--light-00;
}

.table.table--border-selection
  tbody
  :deep(.table__row.table__row--selected .table__cell) {
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: $color-border-primary--main;
  border-top-width: 2px;
  border-top-style: solid;
  border-top-color: $color-border-primary--main;
}

.table.table--cell-emphasis-color tbody :deep(.table__cell) {
  color: $color-background-information--main;
}

.table.table--border-selection
  tbody
  :deep(.table__row.table__row--selected .table__cell:first-child) {
  border-left-width: 2px;
  border-left-style: solid;
  border-left-color: $color-border-primary--main;
}

.table.table--border-selection
  tbody
  :deep(.table__row.table__row--selected .table__cell:last-child) {
  border-right-width: 2px;
  border-right-style: solid;
  border-right-color: $color-border-primary--main;
}

.table tbody :deep(.table__row:last-child .table__cell) {
  border-bottom: none;
}

.table.table--background-selection
  tbody
  :deep(.table__row.table__row--disabled) {
  background-color: $color-background-neutral--light-01;
  pointer-events: none;
}
</style>
