<template>
  <tr :class="getRowClass()">
    <slot />
  </tr>
</template>

<script setup lang="ts">
import { computed, ComputedRef, inject } from 'vue';

type Props = {
  id: string;
  rowColor?: 'neutralLight02';
};

const props = defineProps<Props>();

const { selectedRowsIds, disabledRowsIds } = inject('tableState') as {
  selectedRowsIds: ComputedRef<string[]>;
  disabledRowsIds: ComputedRef<string[]>;
};

const isSelected = computed(() => {
  return selectedRowsIds.value.find((id) => props.id === id) !== undefined;
});

const isDisabled = computed(() => {
  return disabledRowsIds.value.find((id) => props.id === id) !== undefined;
});

const getRowClass = () => {
  const selectedClass = isSelected.value ? [`table__row--selected`] : [];
  const disabledClass = isDisabled.value ? [`table__row--disabled`] : [];
  const rowColorClass = props.rowColor ? [getColorClass(props.rowColor)] : [];
  return [
    'table__row',
    ...selectedClass,
    ...disabledClass,
    ...rowColorClass,
  ].join(' ');
};

const getColorClass = (color: 'neutralLight02') => {
  switch (color) {
    case 'neutralLight02':
      return 'table__row--neutral-light-02';
    default:
      return '';
  }
};
</script>

<style scoped lang="scss">
@import '../../scss/mixins';
@import '../../scss/variables';

.table__row--neutral-light-02 {
  background-color: $color-background-neutral--light-02;
}
</style>
